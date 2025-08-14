import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApointmentsService } from './appointment.service';
import { ContactsController } from './appointment.controller';
import { Appointment, AppointmentSchema } from '../schemas/contacts.schema';
import { Match, MatchSchema } from '../schemas/matches.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
      { name: Match.name, schema: MatchSchema },
    ]),
  ],
  controllers: [ContactsController],
  providers: [ApointmentsService],
  exports: [ApointmentsService],
})
export class ContactsModule {}
