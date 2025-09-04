import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
  async uploadImage(
    file: Express.Multer.File,
    folder: string = 'wildwolf',
  ): Promise<{ url: string; publicId: string }> {
    // Validate file
    if (!file) {
      throw new BadRequestException('Không có file được upload');
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Chỉ chấp nhận file ảnh (JPEG, PNG, JPG, WebP)',
      );
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('File quá lớn. Tối đa 5MB');
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'image',
          transformation: [
            { width: 1200, height: 800, crop: 'limit' },
            { quality: 'auto:good' },
            { format: 'webp' },
          ],
          use_filename: true,
          unique_filename: true,
        },
        (error, result: any) => {
          if (error) {
            reject(new BadRequestException(`Upload failed: ${error.message}`));
          } else {
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
            });
          }
        },
      );

      // Convert buffer to stream
      const stream = Readable.from(file.buffer);
      stream.pipe(uploadStream);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw new BadRequestException(`Xóa ảnh thất bại: ${error.message}`);
    }
  }

  getPublicIdFromUrl(url: string): string {
    try {
      // Example URL: http://res.cloudinary.com/cloud_name/image/upload/v12345/folder/public_id.webp
      // We want to extract "folder/public_id"
      const parts = url.split('/');
      const uploadIndex = parts.indexOf('upload');
      if (uploadIndex === -1 || uploadIndex + 2 >= parts.length) {
        throw new Error('Invalid Cloudinary URL format');
      }

      // The part after version number is the public_id with extension
      const publicIdWithExtension = parts.slice(uploadIndex + 2).join('/');
      const lastDotIndex = publicIdWithExtension.lastIndexOf('.');

      if (lastDotIndex === -1) {
        return publicIdWithExtension; // No extension found
      }

      return publicIdWithExtension.substring(0, lastDotIndex);
    } catch (error) {
      console.error('Error extracting public ID:', error);
      throw new BadRequestException('URL của ảnh không hợp lệ');
    }
  }

  async uploadMultipleImages(
    files: Express.Multer.File[],
    folder: string = 'wildwolf',
  ): Promise<{ url: string; publicId: string }[]> {
    const uploadPromises = files.map((file) => this.uploadImage(file, folder));
    return Promise.all(uploadPromises);
  }
}
