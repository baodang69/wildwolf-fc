import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  async create(@Body() createBlogDto: CreateBlogDto) {
    try {
      return await this.blogsService.create(createBlogDto);
    } catch (error) {
      throw new HttpException(
        'Không thể tạo blog: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(@Query('author') authorId?: string) {
    try {
      if (authorId) {
        return await this.blogsService.findByAuthor(authorId);
      }
      return await this.blogsService.findAll();
    } catch (error) {
      throw new HttpException(
        'Không thể lấy danh sách blogs: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const blog = await this.blogsService.findOne(id);
      if (!blog) {
        throw new HttpException('Blog không tồn tại', HttpStatus.NOT_FOUND);
      }
      return blog;
    } catch (error) {
      throw new HttpException(
        'Không thể tìm blog: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBlogDto: Partial<CreateBlogDto>,
  ) {
    try {
      const blog = await this.blogsService.update(id, updateBlogDto);
      if (!blog) {
        throw new HttpException('Blog không tồn tại', HttpStatus.NOT_FOUND);
      }
      return blog;
    } catch (error) {
      throw new HttpException(
        'Không thể cập nhật blog: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const blog = await this.blogsService.remove(id);
      if (!blog) {
        throw new HttpException('Blog không tồn tại', HttpStatus.NOT_FOUND);
      }
      return { message: 'Xóa blog thành công', blog };
    } catch (error) {
      throw new HttpException(
        'Không thể xóa blog: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id/like')
  async incrementLike(@Param('id') id: string) {
    try {
      const blog = await this.blogsService.incrementLike(id);
      if (!blog) {
        throw new HttpException('Blog không tồn tại', HttpStatus.NOT_FOUND);
      }
      return blog;
    } catch (error) {
      throw new HttpException(
        'Không thể like blog: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id/unlike')
  async decrementLike(@Param('id') id: string) {
    try {
      const blog = await this.blogsService.decrementLike(id);
      if (!blog) {
        throw new HttpException('Blog không tồn tại', HttpStatus.NOT_FOUND);
      }
      return blog;
    } catch (error) {
      throw new HttpException(
        'Không thể unlike blog: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
