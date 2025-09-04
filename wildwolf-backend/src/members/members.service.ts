import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Member,
  MemberDocument,
  MemberStatus,
  MemberPosition,
  MemberRole,
} from '../schemas/members.schema';
import { CreateMemberDto } from './dto/create-member.dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<MemberDocument>,
    private uploadService: UploadService,
  ) {}

  async create(
    createMemberDto: CreateMemberDto,
    avatar?: Express.Multer.File,
  ): Promise<Member> {
    // Kiểm tra số áo đã tồn tại chưa
    const existingMember = await this.memberModel.findOne({
      number: createMemberDto.number,
    });
    if (existingMember) {
      throw new ConflictException(
        `Số áo ${createMemberDto.number} đã được sử dụng`,
      );
    }

    let avatarUrl = '';
    if (avatar) {
      const uploadResult = await this.uploadService.uploadImage(
        avatar,
        'members',
      );
      avatarUrl = uploadResult.url;
    }

    const createdMember = new this.memberModel({
      ...createMemberDto,
      avatar: avatarUrl,
    });
    return createdMember.save();
  }

  async findAll(
    status?: MemberStatus,
    position?: MemberPosition,
    role?: MemberRole,
  ): Promise<Member[]> {
    const filter: any = {};

    if (status) filter.status = status;
    if (position) filter.position = position;
    if (role) filter.role = role;

    return this.memberModel
      .find(filter)
      .sort({ number: 1 }) // Sắp xếp theo số áo
      .exec();
  }

  async findOne(id: string): Promise<Member | null> {
    return this.memberModel.findById(id).exec();
  }

  async findByNumber(number: number): Promise<Member | null> {
    return this.memberModel.findOne({ number }).exec();
  }

  async findByPosition(position: MemberPosition): Promise<Member[]> {
    return this.memberModel
      .find({ position, status: { $ne: MemberStatus.HIDDEN } })
      .sort({ number: 1 })
      .exec();
  }

  async findByRole(role: MemberRole): Promise<Member[]> {
    return this.memberModel
      .find({ role, status: { $ne: MemberStatus.HIDDEN } })
      .sort({ number: 1 })
      .exec();
  }

  async update(
    id: string,
    updateData: CreateMemberDto,
    avatar?: Express.Multer.File,
  ): Promise<Member | null> {
    // Nếu cập nhật số áo, kiểm tra trùng lặp
    if (updateData.number) {
      const existingMember = await this.memberModel.findOne({
        number: updateData.number,
        _id: { $ne: id },
      });
      if (existingMember) {
        throw new ConflictException(
          `Số áo ${updateData.number} đã được sử dụng`,
        );
      }
    }

    const memberToUpdate = await this.findOne(id);
    if (!memberToUpdate) {
      return null;
    }

    const updatePayload: any = { ...updateData };

    if (avatar) {
      // Nếu có avatar cũ, xóa nó đi
      if (memberToUpdate.avatar) {
        try {
          const publicId = this.uploadService.getPublicIdFromUrl(
            memberToUpdate.avatar,
          );
          await this.uploadService.deleteImage(publicId);
        } catch (error) {
          console.error('Không thể xóa ảnh cũ:', error);
        }
      }

      // Upload avatar mới
      const uploadResult = await this.uploadService.uploadImage(
        avatar,
        'members',
      );
      updatePayload.avatar = uploadResult.url;
    }

    return this.memberModel
      .findByIdAndUpdate(id, updatePayload, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Member | null> {
    return this.memberModel.findByIdAndDelete(id).exec();
  }

  async updateStatus(id: string, status: MemberStatus): Promise<Member | null> {
    return this.memberModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }

  async getSquadStats(): Promise<any> {
    const stats = await this.memberModel.aggregate([
      {
        $group: {
          _id: '$position',
          count: { $sum: 1 },
          playing: {
            $sum: {
              $cond: [{ $eq: ['$status', MemberStatus.PLAYING] }, 1, 0],
            },
          },
          injured: {
            $sum: {
              $cond: [{ $eq: ['$status', MemberStatus.INJURED] }, 1, 0],
            },
          },
        },
      },
    ]);

    const totalStats = await this.memberModel.aggregate([
      {
        $group: {
          _id: null,
          totalMembers: { $sum: 1 },
          totalPlaying: {
            $sum: {
              $cond: [{ $eq: ['$status', MemberStatus.PLAYING] }, 1, 0],
            },
          },
          totalInjured: {
            $sum: {
              $cond: [{ $eq: ['$status', MemberStatus.INJURED] }, 1, 0],
            },
          },
          captains: {
            $sum: {
              $cond: [{ $eq: ['$role', MemberRole.CAPTAIN] }, 1, 0],
            },
          },
          viceCaptains: {
            $sum: {
              $cond: [{ $eq: ['$role', MemberRole.VICE_CAPTAIN] }, 1, 0],
            },
          },
        },
      },
    ]);

    return {
      byPosition: stats,
      total: totalStats[0] || {
        totalMembers: 0,
        totalPlaying: 0,
        totalInjured: 0,
        captains: 0,
        viceCaptains: 0,
      },
    };
  }

  async getAvailableNumbers(): Promise<number[]> {
    const usedNumbers = await this.memberModel.distinct('number');
    const allNumbers = Array.from({ length: 99 }, (_, i) => i + 1);
    return allNumbers.filter((num) => !usedNumbers.includes(num));
  }
}
