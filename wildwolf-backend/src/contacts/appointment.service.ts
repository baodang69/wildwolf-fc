import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Appointment,
  AppointmentDocument,
  AppointmentStatus,
} from '../schemas/contacts.schema';
import { Match, MatchDocument, Status } from '../schemas/matches.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class ApointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const createdAppointment = new this.appointmentModel(createAppointmentDto);
    return createdAppointment.save();
  }

  async findAll(status?: AppointmentStatus): Promise<Appointment[]> {
    const filter = status ? { status } : {};
    return this.appointmentModel
      .find(filter)
      .populate('opponent', 'fullname email phone club')
      .sort({ appointmenttime: 1 })
      .exec();
  }

  async findOne(id: string): Promise<Appointment | null> {
    return this.appointmentModel
      .findById(id)
      .populate('opponent', 'fullname email phone club')
      .exec();
  }

  async findByOpponent(opponentId: string): Promise<Appointment[]> {
    return this.appointmentModel
      .find({ opponent: opponentId })
      .populate('opponent', 'fullname email phone club')
      .sort({ appointmenttime: 1 })
      .exec();
  }

  async findByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<Appointment[]> {
    return this.appointmentModel
      .find({
        appointmenttime: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .populate('opponent', 'fullname email phone club')
      .sort({ appointmenttime: 1 })
      .exec();
  }

  async update(
    id: string,
    updateData: Partial<CreateAppointmentDto>,
  ): Promise<Appointment | null> {
    const appointment = await this.appointmentModel.findById(id);
    if (!appointment) {
      return null;
    }

    // Kiểm tra nếu status thay đổi thành CONFIRMED
    const isConfirming =
      updateData.status === AppointmentStatus.CONFIRMED &&
      appointment.status !== AppointmentStatus.CONFIRMED;

    const updatedAppointment = await this.appointmentModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('opponent', 'fullname email phone club')
      .exec();

    // Tự động tạo trận đấu khi confirm
    if (isConfirming && updatedAppointment) {
      await this.createMatchFromAppointment(updatedAppointment);
    }

    return updatedAppointment;
  }

  async remove(id: string): Promise<Appointment | null> {
    return this.appointmentModel.findByIdAndDelete(id).exec();
  }

  async updateStatus(
    id: string,
    status: AppointmentStatus,
  ): Promise<Appointment | null> {
    const appointment = await this.appointmentModel.findById(id);
    if (!appointment) {
      return null;
    }

    // Kiểm tra nếu status thay đổi thành CONFIRMED
    const isConfirming =
      status === AppointmentStatus.CONFIRMED &&
      appointment.status !== AppointmentStatus.CONFIRMED;

    const updatedAppointment = await this.appointmentModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .populate('opponent', 'fullname email phone club')
      .exec();

    // Tự động tạo trận đấu khi confirm
    if (isConfirming && updatedAppointment) {
      await this.createMatchFromAppointment(updatedAppointment);
    }

    return updatedAppointment;
  }

  private async createMatchFromAppointment(
    appointment: Appointment,
  ): Promise<Match> {
    // Lấy thông tin opponent đã được populate
    const opponent = appointment.opponent as any;

    const matchData = {
      opponent: opponent.club || opponent.fullname || 'Đội bóng khách',
      our_scorer: [], // Mảng rỗng ban đầu
      stadium: appointment.stadium,
      opponent_avatar: '', // Có thể thêm logic để lấy avatar từ opponent
      opponent_scorer: [], // Mảng rỗng ban đầu
      summary: `Trận đấu được tạo tự động từ lịch hẹn. ${appointment.note || ''}`,
      our_goal: 0, // Mặc định 0
      opponent_goal: 0, // Mặc định 0
      images: [], // Mảng rỗng ban đầu
      date: appointment.appointmenttime,
      status: Status.COMING_SOON, // Trạng thái sắp diễn ra
    };

    const createdMatch = new this.matchModel(matchData);
    return createdMatch.save();
  }

  async getAppointmentStats(): Promise<any> {
    const stats = await this.appointmentModel.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const totalStats = await this.appointmentModel.aggregate([
      {
        $group: {
          _id: null,
          totalAppointments: { $sum: 1 },
          pending: {
            $sum: {
              $cond: [{ $eq: ['$status', AppointmentStatus.PENDING] }, 1, 0],
            },
          },
          confirmed: {
            $sum: {
              $cond: [{ $eq: ['$status', AppointmentStatus.CONFIRMED] }, 1, 0],
            },
          },
          cancelled: {
            $sum: {
              $cond: [{ $eq: ['$status', AppointmentStatus.CANCELLED] }, 1, 0],
            },
          },
        },
      },
    ]);

    return {
      byStatus: stats,
      total: totalStats[0] || {
        totalAppointments: 0,
        pending: 0,
        confirmed: 0,
        cancelled: 0,
      },
    };
  }

  async getUpcomingAppointments(days: number = 7): Promise<Appointment[]> {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(now.getDate() + days);

    return this.appointmentModel
      .find({
        appointmenttime: {
          $gte: now,
          $lte: futureDate,
        },
        status: { $ne: AppointmentStatus.CANCELLED },
      })
      .populate('opponent', 'fullname email phone club')
      .sort({ appointmenttime: 1 })
      .exec();
  }
}
