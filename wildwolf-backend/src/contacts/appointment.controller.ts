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
import { ApointmentsService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentStatus } from '../schemas/contacts.schema';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly apointmentsService: ApointmentsService) {}

  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    try {
      return await this.apointmentsService.create(createAppointmentDto);
    } catch (error) {
      throw new HttpException(
        'Không thể tạo lịch hẹn: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(
    @Query('status') status?: AppointmentStatus,
    @Query('opponent') opponentId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    try {
      if (opponentId) {
        return await this.apointmentsService.findByOpponent(opponentId);
      }

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return await this.apointmentsService.findByDateRange(start, end);
      }

      return await this.apointmentsService.findAll(status);
    } catch (error) {
      throw new HttpException(
        'Không thể lấy danh sách lịch hẹn: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('stats')
  async getStats() {
    try {
      return await this.apointmentsService.getAppointmentStats();
    } catch (error) {
      throw new HttpException(
        'Không thể lấy thống kê lịch hẹn: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('upcoming')
  async getUpcoming(@Query('days') days?: string) {
    try {
      const daysNumber = days ? parseInt(days) : 7;
      return await this.apointmentsService.getUpcomingAppointments(daysNumber);
    } catch (error) {
      throw new HttpException(
        'Không thể lấy lịch hẹn sắp tới: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const appointment = await this.apointmentsService.findOne(id);
      if (!appointment) {
        throw new HttpException('Lịch hẹn không tồn tại', HttpStatus.NOT_FOUND);
      }
      return appointment;
    } catch (error) {
      throw new HttpException(
        'Không thể tìm lịch hẹn: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: Partial<CreateAppointmentDto>,
  ) {
    try {
      const appointment = await this.apointmentsService.update(
        id,
        updateAppointmentDto,
      );
      if (!appointment) {
        throw new HttpException('Lịch hẹn không tồn tại', HttpStatus.NOT_FOUND);
      }
      return {
        message:
          updateAppointmentDto.status === AppointmentStatus.CONFIRMED
            ? 'Xác nhận lịch hẹn thành công và đã tạo trận đấu tự động'
            : 'Cập nhật lịch hẹn thành công',
        appointment,
      };
    } catch (error) {
      throw new HttpException(
        'Không thể cập nhật lịch hẹn: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: AppointmentStatus,
  ) {
    try {
      const appointment = await this.apointmentsService.updateStatus(
        id,
        status,
      );
      if (!appointment) {
        throw new HttpException('Lịch hẹn không tồn tại', HttpStatus.NOT_FOUND);
      }
      return {
        message:
          status === AppointmentStatus.CONFIRMED
            ? 'Xác nhận lịch hẹn thành công và đã tạo trận đấu tự động'
            : 'Cập nhật trạng thái lịch hẹn thành công',
        appointment,
      };
    } catch (error) {
      throw new HttpException(
        'Không thể cập nhật trạng thái lịch hẹn: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id/confirm')
  async confirmAppointment(@Param('id') id: string) {
    try {
      const appointment = await this.apointmentsService.updateStatus(
        id,
        AppointmentStatus.CONFIRMED,
      );
      if (!appointment) {
        throw new HttpException('Lịch hẹn không tồn tại', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'Xác nhận lịch hẹn thành công và đã tạo trận đấu tự động',
        appointment,
      };
    } catch (error) {
      throw new HttpException(
        'Không thể xác nhận lịch hẹn: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id/cancel')
  async cancelAppointment(@Param('id') id: string) {
    try {
      const appointment = await this.apointmentsService.updateStatus(
        id,
        AppointmentStatus.CANCELLED,
      );
      if (!appointment) {
        throw new HttpException('Lịch hẹn không tồn tại', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'Hủy lịch hẹn thành công',
        appointment,
      };
    } catch (error) {
      throw new HttpException(
        'Không thể hủy lịch hẹn: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const appointment = await this.apointmentsService.remove(id);
      if (!appointment) {
        throw new HttpException('Lịch hẹn không tồn tại', HttpStatus.NOT_FOUND);
      }
      return { message: 'Xóa lịch hẹn thành công', appointment };
    } catch (error) {
      throw new HttpException(
        'Không thể xóa lịch hẹn: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
