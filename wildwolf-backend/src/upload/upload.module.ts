import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { CloudinaryProvider } from '../config/cloudinary.config';

@Module({
  imports: [ConfigModule],
  providers: [UploadService, CloudinaryProvider],
  controllers: [UploadController],
  exports: [UploadService],
})
export class UploadModule {}