import {
  Controller,
  Get,
  HttpStatus,
  HttpException,
  Query,
  Post,
  Body,
  Put,
  Param,
} from '@nestjs/common';
import { FormationsService } from './formations.service';
import { CreateFormationDto } from './dto/create-formation.dto';

@Controller('formations')
export class FormationsController {
  constructor(private readonly formationService: FormationsService) {}

  @Get()
  async getAllFormation(@Query('type') type?: string) {
    try {
      if (type) {
        return await this.formationService.findFormationByType(type);
      }
      return await this.formationService.findAll();
    } catch (error) {
      throw new HttpException(
        'Không thể lấy danh sách đội hình: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(@Body() createFormationDto: CreateFormationDto) {
    try {
      return await this.formationService.create(createFormationDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Không thể tạo đội hình: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':formationId/detail/:detailId/member')
  async updateMemberId(
    @Param('formationId') formationId: string,
    @Param('detailId') detailId: string,
    @Body('newMemberId') newMemberId: string,
  ) {
    try {
      const updatedFormation = await this.formationService.updateMemberId(
        formationId,
        detailId,
        newMemberId,
      );
      if (!updatedFormation) {
        throw new HttpException(
          'Không tìm thấy đội hình hoặc chi tiết tương ứng',
          HttpStatus.NOT_FOUND,
        );
      }
      return updatedFormation;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Không thể cập nhật memberId: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
