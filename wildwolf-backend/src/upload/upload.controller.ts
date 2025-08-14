import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  // Upload 1 ảnh
  @Post('image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingleImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('folder') folder?: string,
  ) {
    const result = await this.uploadService.uploadImage(
      file,
      folder || 'wildwolf'
    );
    
    return {
      success: true,
      message: 'Upload ảnh thành công',
      data: result,
    };
  }

  // Upload nhiều ảnh
  @Post('images')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files', 10)) // Tối đa 10 files
  async uploadMultipleImages(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('folder') folder?: string,
  ) {
    const results = await this.uploadService.uploadMultipleImages(
      files,
      folder || 'wildwolf'
    );
    
    return {
      success: true,
      message: `Upload ${results.length} ảnh thành công`,
      data: results,
    };
  }

  // Upload avatar (public route cho register)
  @Public()
  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    const result = await this.uploadService.uploadImage(file, 'avatars');
    
    return {
      success: true,
      message: 'Upload avatar thành công',
      data: result,
    };
  }

  // Xóa ảnh
  @Delete(':publicId')
  @UseGuards(JwtAuthGuard)
  async deleteImage(@Param('publicId') publicId: string) {
    // Decode publicId từ URL
    const decodedPublicId = decodeURIComponent(publicId);
    await this.uploadService.deleteImage(decodedPublicId);
    
    return {
      success: true,
      message: 'Xóa ảnh thành công',
    };
  }
}