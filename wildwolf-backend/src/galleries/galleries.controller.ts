import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  Body,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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

  @UseGuards(JwtAuthGuard)
  @Put(':galleryId/like')
  async userLikeIncrement(
    @Param('galleryId') galleryId: string,
    @Request() req,
  ) {
    const userId = req.user.sub;
    const updatedGallery = await this.galleriesService.userLike(
      galleryId,
      userId,
    );
    if (!updatedGallery) {
      return { success: false, data: 'Không like ảnh được' };
    }
    return { success: true, data: updatedGallery };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':galleryId/unlike')
  async userLikeDecrement(
    @Param('galleryId') galleryId: string,
    @Request() req,
  ) {
    const userId = req.user.sub;
    const updatedGallery = await this.galleriesService.userLikeDecrement(
      galleryId,
      userId,
    );
    if (!updatedGallery) {
      return {
        success: false,
        message: 'Lỗi server không unlike được',
      };
    }
    return {
      success: true,
      data: updatedGallery,
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
