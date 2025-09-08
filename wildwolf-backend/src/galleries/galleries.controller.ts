import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GalleriesService } from './galleries.service';
import { CreateGalleryDto } from './dto/gallery-create.dto';

@Controller('galleries')
export class GalleriesController {
  constructor(private readonly galleriesService: GalleriesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() createGalleryDto: CreateGalleryDto,
  ) {
    const result = await this.galleriesService.uploadImage(
      createGalleryDto,
      file,
    );
    return {
      success: true,
      message: 'Tải ảnh lên gallery thành công',
      data: result,
    };
  }

  @Get()
  async getAllImages() {
    const results = await this.galleriesService.findAll();
    return {
      success: true,
      message: 'Lấy danh sách ảnh thành công',
      data: results,
    };
  }

  @Get(':id')
  async getImagesDetail(@Param('id') id: string) {
    const results = await this.galleriesService.findGallery(id);
    return {
      success: true,
      message: 'Lấy ảnh thành công',
      data: results,
    };
  }

  @Delete(':id')
  async deleteImage(@Param('id') id: string) {
    const result = await this.galleriesService.deleteImage(id);
    if (!result) {
      return {
        success: false,
        message: 'Không tìm thấy ảnh để xóa',
      };
    }
    return {
      success: true,
      message: 'Xóa ảnh thành công',
    };
  }
}
