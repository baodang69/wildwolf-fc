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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new HttpException(
        'Không thể tạo user: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(
    @Query('phone') phone?: string,
    @Query('email') email?: string,
  ) {
    try {
      if (phone) {
        const user = await this.usersService.findByPhone(phone);
        return user ? [user] : [];
      }
      if (email) {
        const user = await this.usersService.findByEmail(email);
        return user ? [user] : [];
      }
      return await this.usersService.findAll();
    } catch (error) {
      throw new HttpException(
        'Không thể lấy danh sách users: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(id);
      if (!user) {
        throw new HttpException('User không tồn tại', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException(
        'Không thể tìm user: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<CreateUserDto>,
  ) {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      if (!user) {
        throw new HttpException('User không tồn tại', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException(
        'Không thể cập nhật user: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const user = await this.usersService.remove(id);
      if (!user) {
        throw new HttpException('User không tồn tại', HttpStatus.NOT_FOUND);
      }
      return { message: 'Xóa user thành công', user };
    } catch (error) {
      throw new HttpException(
        'Không thể xóa user: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
