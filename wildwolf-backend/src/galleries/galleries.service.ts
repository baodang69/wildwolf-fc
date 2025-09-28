/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gallery, GalleryDocument } from 'src/schemas/galleries.schema';
import { UploadService } from 'src/upload/upload.service';
import { CreateGalleryDto } from './dto/gallery-create.dto';
import { Types } from 'mongoose';

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
    return this.galleryModel
      .find()
      .populate('user')
      .populate('userLiked')
      .exec();
  }

  async findGallery(id: string): Promise<Gallery | null> {
    return this.galleryModel
      .findById(id)
      .populate('user')
      .populate('userLiked')
      .exec();
  }

  async userLike(
    galleryId: string,
    userId: string | Types.ObjectId,
  ): Promise<Gallery | null> {
    if (!userId) {
      throw new BadRequestException('Missing user id');
    }

    // Validate/chuẩn hoá userId
    let userObjectId: Types.ObjectId;
    if (userId instanceof Types.ObjectId) {
      userObjectId = userId;
    } else if (Types.ObjectId.isValid(String(userId))) {
      userObjectId = new Types.ObjectId(String(userId));
    } else {
      throw new BadRequestException('Invalid user id');
    }

    const gallery = await this.galleryModel.findById(galleryId);
    if (!gallery) return null;

    const alreadyLiked = gallery.userLiked.some(
      (id: any) => id.toString() === userObjectId.toString(),
    );

    if (!alreadyLiked) {
      gallery.userLiked.push(userObjectId);
      await gallery.save();
    }

    return gallery;
  }

  async userLikeDecrement(
    galleryId: string,
    userId: string,
  ): Promise<Gallery | null> {
    const gallery = await this.galleryModel.findById(galleryId);
    if (!gallery) return null;
    if (!userId) return null;

    const userObjectId = new Types.ObjectId(userId);

    gallery.userLiked = gallery.userLiked.filter((id) => {
      const objectId = typeof id === 'string' ? new Types.ObjectId(id) : id;
      return !objectId.equals(userObjectId);
    });

    await gallery.save();

    return gallery;
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
