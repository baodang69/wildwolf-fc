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
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { Status } from '../schemas/matches.schema';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  async create(@Body() createMatchDto: CreateMatchDto) {
    try {
      return await this.matchesService.create(createMatchDto);
    } catch (error) {
      throw new HttpException(
        'Không thể tạo trận đấu: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(
    @Query('status') status?: Status,
    @Query('opponent') opponent?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    try {
      if (opponent) {
        return await this.matchesService.findByOpponent(opponent);
      }
      
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return await this.matchesService.findByDateRange(start, end);
      }
      
      return await this.matchesService.findAll(status);
    } catch (error) {
      throw new HttpException(
        'Không thể lấy danh sách trận đấu: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('stats')
  async getStats() {
    try {
      return await this.matchesService.getMatchStats();
    } catch (error) {
      throw new HttpException(
        'Không thể lấy thống kê trận đấu: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const match = await this.matchesService.findOne(id);
      if (!match) {
        throw new HttpException('Trận đấu không tồn tại', HttpStatus.NOT_FOUND);
      }
      return match;
    } catch (error) {
      throw new HttpException(
        'Không thể tìm trận đấu: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMatchDto: Partial<CreateMatchDto>,
  ) {
    try {
      const match = await this.matchesService.update(id, updateMatchDto);
      if (!match) {
        throw new HttpException('Trận đấu không tồn tại', HttpStatus.NOT_FOUND);
      }
      return match;
    } catch (error) {
      throw new HttpException(
        'Không thể cập nhật trận đấu: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: Status,
  ) {
    try {
      const match = await this.matchesService.updateStatus(id, status);
      if (!match) {
        throw new HttpException('Trận đấu không tồn tại', HttpStatus.NOT_FOUND);
      }
      return match;
    } catch (error) {
      throw new HttpException(
        'Không thể cập nhật trạng thái trận đấu: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const match = await this.matchesService.remove(id);
      if (!match) {
        throw new HttpException('Trận đấu không tồn tại', HttpStatus.NOT_FOUND);
      }
      return { message: 'Xóa trận đấu thành công', match };
    } catch (error) {
      throw new HttpException(
        'Không thể xóa trận đấu: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
