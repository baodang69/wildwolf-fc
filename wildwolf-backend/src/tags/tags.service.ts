import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag, TagDocument } from '../schemas/tags.schema';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<TagDocument>) {}

  private generateSlug(name: string): string {
    return name.trim().toLowerCase().replace(/\s+/g, '-');
  }

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    if (!createTagDto.slug) {
      createTagDto.slug = this.generateSlug(createTagDto.name);
    }

    const existingTag = await this.tagModel.findOne({
      $or: [{ name: createTagDto.name }, { slug: createTagDto.slug }],
    });
    if (existingTag) {
      throw new ConflictException('Tên tag hoặc slug đã tồn tại');
    }

    const newTag = new this.tagModel(createTagDto);
    return newTag.save();
  }

  async findAll(): Promise<Tag[]> {
    return this.tagModel.find().exec();
  }

  async findOne(id: string): Promise<Tag> {
    const tag = await this.tagModel.findById(id).exec();
    if (!tag) {
      throw new NotFoundException(`Không tìm thấy tag với ID: ${id}`);
    }
    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    const updatedTag = await this.tagModel
      .findByIdAndUpdate(id, updateTagDto, { new: true })
      .exec();
    if (!updatedTag) {
      throw new NotFoundException(`Không tìm thấy tag với ID: ${id}`);
    }
    return updatedTag;
  }

  async remove(id: string): Promise<Tag> {
    const deletedTag = await this.tagModel.findByIdAndDelete(id).exec();
    if (!deletedTag) {
      throw new NotFoundException(`Không tìm thấy tag với ID: ${id}`);
    }
    return deletedTag;
  }
}
