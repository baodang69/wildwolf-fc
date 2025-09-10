import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from '../schemas/blogs.schema';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const createdBlog = new this.blogModel(createBlogDto);
    return createdBlog.save();
  }

  async findByTag(tag: string): Promise<Blog[]> {
    return this.blogModel.find({ tags: tag }).exec();
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().populate('author', 'fullname email').exec();
  }

  async findOne(id: string): Promise<Blog | null> {
    return this.blogModel
      .findById(id)
      .populate('author', 'fullname email')
      .exec();
  }

  async findByAuthor(authorId: string): Promise<Blog[]> {
    return this.blogModel
      .find({ author: authorId })
      .populate('author', 'fullname email')
      .exec();
  }

  async update(
    id: string,
    updateData: Partial<CreateBlogDto>,
  ): Promise<Blog | null> {
    return this.blogModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('author', 'fullname email')
      .exec();
  }

  async remove(id: string): Promise<Blog | null> {
    return this.blogModel.findByIdAndDelete(id).exec();
  }

  async incrementLike(id: string): Promise<Blog | null> {
    return this.blogModel
      .findByIdAndUpdate(id, { $inc: { like: 1 } }, { new: true })
      .populate('author', 'fullname email')
      .exec();
  }

  async decrementLike(id: string): Promise<Blog | null> {
    return this.blogModel
      .findByIdAndUpdate(id, { $inc: { like: -1 } }, { new: true })
      .populate('author', 'fullname email')
      .exec();
  }
}
