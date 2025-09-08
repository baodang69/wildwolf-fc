import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Match,
  MatchDocument,
  Status,
  MatchImage,
} from '../schemas/matches.schema';
import { CreateMatchDto } from './dto/create-match.dto';
import { CreateMatchWithImagesDto } from './dto/create-match-with-images.dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class MatchesService {
  constructor(
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>,
    private uploadService: UploadService,
  ) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const createdMatch = new this.matchModel(createMatchDto);
    return createdMatch.save();
  }

  async findAll(status?: Status): Promise<Match[]> {
    const filter = status ? { status } : {};
    return this.matchModel
      .find(filter)
      .populate('our_scorer.id', 'fullname -_id')
      .sort({ date: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Match | null> {
    return this.matchModel
      .findById(id)
      .populate('our_scorer.id', 'fullname -_id')
      .exec();
  }

  async findByOpponent(opponent: string): Promise<Match[]> {
    return this.matchModel
      .find({ opponent: { $regex: opponent, $options: 'i' } })
      .populate('our_scorer.id', 'fullname -_id')
      .sort({ date: -1 })
      .exec();
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Match[]> {
    return this.matchModel
      .find({
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .populate('our_scorer.id', 'fullname -_id')
      .sort({ date: -1 })
      .exec();
  }

  async update(
    id: string,
    updateData: Partial<CreateMatchDto>,
  ): Promise<Match | null> {
    return this.matchModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('our_scorer.id', 'fullname -_id')
      .exec();
  }

  async remove(id: string): Promise<Match | null> {
    const matchToDelete = await this.findOne(id);
    if (!matchToDelete) {
      return null;
    }

    // Xóa tất cả ảnh liên quan trên Cloudinary
    if (matchToDelete.images && matchToDelete.images.length > 0) {
      const publicIds = matchToDelete.images.map((image) => image.publicId);
      Promise.all(
        publicIds.map((id) => this.uploadService.deleteImage(id)),
      ).catch((err) => {
        console.error('Lỗi khi xóa ảnh trên Cloudinary: ', err);
      });
    }

    return this.matchModel.findByIdAndDelete(id).exec();
  }

  async updateStatus(id: string, status: Status): Promise<Match | null> {
    return this.matchModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .populate('our_scorer.id', 'fullname -_id')
      .exec();
  }

  async getMatchStats(): Promise<any> {
    const stats = await this.matchModel.aggregate([
      {
        $match: { status: Status.FINISH },
      },
      {
        $group: {
          _id: null,
          totalMatches: { $sum: 1 },
          totalWins: {
            $sum: {
              $cond: [{ $gt: ['$our_goal', '$opponent_goal'] }, 1, 0],
            },
          },
          totalDraws: {
            $sum: {
              $cond: [{ $eq: ['$our_goal', '$opponent_goal'] }, 1, 0],
            },
          },
          totalLosses: {
            $sum: {
              $cond: [{ $lt: ['$our_goal', '$opponent_goal'] }, 1, 0],
            },
          },
          totalGoalsScored: { $sum: '$our_goal' },
          totalGoalsConceded: { $sum: '$opponent_goal' },
        },
      },
    ]);

    return (
      stats[0] || {
        totalMatches: 0,
        totalWins: 0,
        totalDraws: 0,
        totalLosses: 0,
        totalGoalsScored: 0,
        totalGoalsConceded: 0,
      }
    );
  }

  async uploadImages(
    matchId: string,
    files: Express.Multer.File[],
  ): Promise<Match> {
    if (!files || files.length === 0) {
      throw new Error('Không có file nào được upload');
    }

    const uploadResults = await this.uploadService.uploadMultipleImages(
      files,
      'matches',
    );

    const newImages: MatchImage[] = uploadResults.map((result) => ({
      url: result.url,
      publicId: result.publicId,
    }));

    const updatedMatch = await this.matchModel.findByIdAndUpdate(
      matchId,
      { $push: { images: { $each: newImages } } },
      { new: true },
    );

    if (!updatedMatch) {
      throw new NotFoundException('Không tìm thấy trận đấu');
    }

    return updatedMatch;
  }

  async createWithImages(
    createMatchDto: CreateMatchWithImagesDto,
    files: Express.Multer.File[],
  ): Promise<Match> {
    let images: MatchImage[] = [];

    if (files && files.length > 0) {
      const uploadResults = await this.uploadService.uploadMultipleImages(
        files,
        'matches',
      );
      images = uploadResults.map((result) => ({
        url: result.url,
        publicId: result.publicId,
      }));
    }

    const { our_scorer, ...restOfDto } = createMatchDto;

    const payloadToSave: any = {
      ...restOfDto,
      images,
    };

    if (our_scorer && Array.isArray(our_scorer) && our_scorer.length > 0) {
      payloadToSave.our_scorer = our_scorer.map((scorer) => ({
        id: new Types.ObjectId(scorer.id),
        number_of_goal: scorer.number_of_goal,
      }));
    }

    const createdMatch = new this.matchModel(payloadToSave);
    return createdMatch.save();
  }
}
