/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gallery, GalleryDocument } from 'src/schemas/galleries.schema';
import { UploadService } from 'src/upload/upload.service';
import { CreateGalleryDto } from './dto/gallery-create.dto';

@Injectable()
export class GalleriesService {
  constructor(
    @InjectModel(Gallery.name) private galleryModel: Model<GalleryDocument>,
    private readonly uploadService: UploadService,
  ) {}

  async uploadImage(
    createGalleryDto: CreateGalleryDto,
    image: Express.Multer.File,
  ): Promise<Gallery> {
    if (!image) {
      throw new BadRequestException('File ảnh không được để trống');
    }

    // Tải ảnh lên Cloudinary vào thư mục 'galleries'
    const uploadResult = await this.uploadService.uploadImage(
      image,
      'galleries',
    );

    // Tạo bản ghi mới trong database
    const newGalleryItem = new this.galleryModel({
      ...createGalleryDto,
      imageUrl: uploadResult.url,
      publicId: uploadResult.publicId,
    });

    return newGalleryItem.save();
  }

  async findAll(): Promise<Gallery[]> {
    return this.galleryModel.find().exec();
  }

  async findGallery(id: string): Promise<Gallery | null> {
    return this.galleryModel.findById(id).exec();
  }

  async deleteImage(id: string): Promise<Gallery | null> {
    const itemToDelete = await this.galleryModel.findById(id);

    if (!itemToDelete) {
      return null;
    }

    // Xóa ảnh trên Cloudinary
    if (itemToDelete._id) {
      await this.uploadService.deleteImage(itemToDelete._id.toString());
    }

    // Xóa bản ghi trong database
    return this.galleryModel.findByIdAndDelete(id).exec();
  }
}
