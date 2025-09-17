import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MatchesModule } from './matches/matches.module';
import { BlogsModule } from './blogs/blogs.module';
import { MembersModule } from './members/members.module';
import { ContactsModule } from './contacts/appointment.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { GalleriesModule } from './galleries/galleries.module';

import { TagsModule } from './tags/tags.module';
import { FormationsModule } from './formations/formations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),
    UsersModule,
    MatchesModule,
    BlogsModule,
    MembersModule,
    ContactsModule,
    AuthModule,
    TagsModule,
    UploadModule,
    GalleriesModule,
    FormationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
