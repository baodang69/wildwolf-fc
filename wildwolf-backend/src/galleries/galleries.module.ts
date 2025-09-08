/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { GalleriesController } from './galleries.controller';
import { GalleriesService } from './galleries.service';
import { GallerySchema, Gallery } from 'src/schemas/galleries.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gallery.name, schema: GallerySchema }]),
    UploadModule, 
  ],
  controllers: [GalleriesController],
  providers: [GalleriesService],
})
export class GalleriesModule {}
