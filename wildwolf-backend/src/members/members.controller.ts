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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import {
  MemberStatus,
  MemberPosition,
  MemberRole,
} from '../schemas/members.schema';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  async create(
    @Body() createMemberDto: CreateMemberDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    try {
      return await this.membersService.create(createMemberDto, avatar);
    } catch (error) {
      throw new HttpException(
        'Không thể tạo thành viên: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(
    @Query('status') status?: MemberStatus,
    @Query('position') position?: MemberPosition,
    @Query('role') role?: MemberRole,
    @Query('number') number?: string,
  ) {
    try {
      if (number) {
        const member = await this.membersService.findByNumber(parseInt(number));
        return member ? [member] : [];
      }

      return await this.membersService.findAll(status, position, role);
    } catch (error) {
      throw new HttpException(
        'Không thể lấy danh sách thành viên: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('stats')
  async getStats() {
    try {
      return await this.membersService.getSquadStats();
    } catch (error) {
      throw new HttpException(
        'Không thể lấy thống kê đội hình: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('available-numbers')
  async getAvailableNumbers() {
    try {
      return await this.membersService.getAvailableNumbers();
    } catch (error) {
      throw new HttpException(
        'Không thể lấy danh sách số áo khả dụng: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('position/:position')
  async findByPosition(@Param('position') position: MemberPosition) {
    try {
      return await this.membersService.findByPosition(position);
    } catch (error) {
      throw new HttpException(
        'Không thể lấy danh sách thành viên theo vị trí: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('role/:role')
  async findByRole(@Param('role') role: MemberRole) {
    try {
      return await this.membersService.findByRole(role);
    } catch (error) {
      throw new HttpException(
        'Không thể lấy danh sách thành viên theo vai trò: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const member = await this.membersService.findOne(id);
      if (!member) {
        throw new HttpException(
          'Thành viên không tồn tại',
          HttpStatus.NOT_FOUND,
        );
      }
      return member;
    } catch (error) {
      throw new HttpException(
        'Không thể tìm thành viên: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  async update(
    @Param('id') id: string,
    @Body() updateMemberDto: CreateMemberDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    try {
      const member = await this.membersService.update(
        id,
        updateMemberDto,
        avatar,
      );
      if (!member) {
        throw new HttpException(
          'Thành viên không tồn tại',
          HttpStatus.NOT_FOUND,
        );
      }
      return member;
    } catch (error) {
      throw new HttpException(
        'Không thể cập nhật thành viên: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: MemberStatus,
  ) {
    try {
      const member = await this.membersService.updateStatus(id, status);
      if (!member) {
        throw new HttpException(
          'Thành viên không tồn tại',
          HttpStatus.NOT_FOUND,
        );
      }
      return member;
    } catch (error) {
      throw new HttpException(
        'Không thể cập nhật trạng thái thành viên: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const member = await this.membersService.remove(id);
      if (!member) {
        throw new HttpException(
          'Thành viên không tồn tại',
          HttpStatus.NOT_FOUND,
        );
      }
      return { message: 'Xóa thành viên thành công', member };
    } catch (error) {
      throw new HttpException(
        'Không thể xóa thành viên: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
