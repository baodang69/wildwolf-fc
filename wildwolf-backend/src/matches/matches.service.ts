import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match, MatchDocument, Status } from '../schemas/matches.schema';
import { CreateMatchDto } from './dto/create-match.dto';
import { CreateMatchWithImagesDto } from './dto/create-match-with-images.dto';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class MatchesService {
  constructor(
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>,
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

  // Upload ảnh cho match đã tồn tại
  async uploadImages(
    matchId: string,
    files: Express.Multer.File[],
  ): Promise<any> {
    if (!files || files.length === 0) {
      throw new Error('Không có file nào được upload');
    }

    // Upload ảnh lên Cloudinary
    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: 'image',
              folder: 'wildwolf/matches',
              transformation: [
                { width: 1200, height: 800, crop: 'limit' },
                { quality: 'auto' },
              ],
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result?.secure_url);
            },
          )
          .end(file.buffer);
      });
    });

    const imageUrls = await Promise.all(uploadPromises);

    // Cập nhật match với URLs ảnh mới
    const updatedMatch = await this.matchModel
      .findByIdAndUpdate(
        matchId,
        { $push: { images: { $each: imageUrls } } },
        { new: true },
      )
      .populate('our_scorer.id', 'fullname')
      .exec();

    if (!updatedMatch) {
      throw new Error('Không tìm thấy trận đấu');
    }

    return {
      message: 'Upload ảnh thành công',
      match: updatedMatch,
      uploadedImages: imageUrls,
    };
  }

  // Tạo match với upload ảnh cùng lúc
  async createWithImages(
    createMatchDto: CreateMatchWithImagesDto,
    files: Express.Multer.File[],
  ): Promise<any> {
    let imageUrls: string[] = [];

    // Upload ảnh nếu có
    if (files && files.length > 0) {
      const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: 'image',
                folder: 'wildwolf/matches',
                transformation: [
                  { width: 1200, height: 800, crop: 'limit' },
                  { quality: 'auto' },
                ],
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result?.secure_url);
              },
            )
            .end(file.buffer);
        });
      });

      imageUrls = (await Promise.all(uploadPromises)) as string[];
    }

    // Tạo match data
    const matchData = {
      ...createMatchDto,
      images: imageUrls,
      our_scorer: createMatchDto.our_scorer || [],
      opponent_scorer: createMatchDto.opponent_scorer || [],
      status: createMatchDto.status || Status.COMING_SOON,
    };

    // Tạo match
    const createdMatch = new this.matchModel(matchData);
    const savedMatch = await createdMatch.save();

    // Populate và return
    const populatedMatch = await this.matchModel
      .findById(savedMatch._id)
      .populate('our_scorer.id', 'fullname')
      .exec();

    return {
      message: 'Tạo trận đấu với ảnh thành công',
      match: populatedMatch,
      uploadedImages: imageUrls,
    };
  } 
}
