import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Formation, FormationDocument } from 'src/schemas/formations.schema';
import { CreateFormationDto } from './dto/create-formation.dto';

@Injectable()
export class FormationsService {
  constructor(
    @InjectModel(Formation.name)
    private formationModel: Model<FormationDocument>,
  ) {}

  async create(
    createFormationDto: CreateFormationDto,
  ): Promise<Formation | null> {
    const exists = await this.formationModel.exists({
      type: createFormationDto.type,
    });
    if (exists) {
      throw new ConflictException(
        `Đã tồn tại loại đội hình này: ${createFormationDto.type} `,
      );
    }
    const createNewFormation = new this.formationModel(createFormationDto);
    return createNewFormation.save();
  }

  async findAll(): Promise<Formation[]> {
    return this.formationModel.find().exec();
  }

  async findFormationByType(type: string): Promise<Formation | null> {
    return this.formationModel
      .findOne({ type })
      .populate('detail.memberId')
      .exec();
  }

  async updateMemberId(
    formationId: string,
    detailId: string,
    newMemberId: string,
  ): Promise<Formation | null> {
    const updated = await this.formationModel.findOneAndUpdate(
      { _id: formationId, 'detail._id': detailId },
      { $set: { 'detail.$.memberId': new Types.ObjectId(newMemberId) } },
      { new: true },
    );
    return updated;
  }

  async updateStatus(
    formationId: string,
    status: boolean,
  ): Promise<Formation | null> {
    if (status === true) {
      // Cập nhật tất cả các formation khác đang có status true thành false
      await this.formationModel.updateMany(
        { status: true, _id: { $ne: formationId } },
        { $set: { status: false } },
      );
    }

    // Update formation có _id = formationId với status mới
    const updated = await this.formationModel.findOneAndUpdate(
      { _id: formationId },
      { $set: { status } },
      { new: true },
    );

    return updated;
  }
}
