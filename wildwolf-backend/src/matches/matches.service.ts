import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match, MatchDocument, Status } from '../schemas/matches.schema';
import { CreateMatchDto } from './dto/create-match.dto';

@Injectable()
export class MatchesService {
  constructor(@InjectModel(Match.name) private matchModel: Model<MatchDocument>) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const createdMatch = new this.matchModel(createMatchDto);
    return createdMatch.save();
  }

  async findAll(status?: Status): Promise<Match[]> {
    const filter = status ? { status } : {};
    return this.matchModel
      .find(filter)
      .populate('our_scorer.id', 'fullname')
      .sort({ date: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Match | null> {
    return this.matchModel
      .findById(id)
      .populate('our_scorer.id', 'fullname')
      .exec();
  }

  async findByOpponent(opponent: string): Promise<Match[]> {
    return this.matchModel
      .find({ opponent: { $regex: opponent, $options: 'i' } })
      .populate('our_scorer.id', 'fullname')
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
      .populate('our_scorer.id', 'fullname')
      .sort({ date: -1 })
      .exec();
  }

  async update(id: string, updateData: Partial<CreateMatchDto>): Promise<Match | null> {
    return this.matchModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('our_scorer.id', 'fullname')
      .exec();
  }

  async remove(id: string): Promise<Match | null> {
    return this.matchModel.findByIdAndDelete(id).exec();
  }

  async updateStatus(id: string, status: Status): Promise<Match | null> {
    return this.matchModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .populate('our_scorer.id', 'fullname')
      .exec();
  }

  async getMatchStats(): Promise<any> {
    const stats = await this.matchModel.aggregate([
      {
        $match: { status: Status.FINISH }
      },
      {
        $group: {
          _id: null,
          totalMatches: { $sum: 1 },
          totalWins: {
            $sum: {
              $cond: [{ $gt: ['$our_goal', '$opponent_goal'] }, 1, 0]
            }
          },
          totalDraws: {
            $sum: {
              $cond: [{ $eq: ['$our_goal', '$opponent_goal'] }, 1, 0]
            }
          },
          totalLosses: {
            $sum: {
              $cond: [{ $lt: ['$our_goal', '$opponent_goal'] }, 1, 0]
            }
          },
          totalGoalsScored: { $sum: '$our_goal' },
          totalGoalsConceded: { $sum: '$opponent_goal' }
        }
      }
    ]);

    return stats[0] || {
      totalMatches: 0,
      totalWins: 0,
      totalDraws: 0,
      totalLosses: 0,
      totalGoalsScored: 0,
      totalGoalsConceded: 0
    };
  }
}
