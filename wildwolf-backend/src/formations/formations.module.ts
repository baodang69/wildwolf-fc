import { Module } from '@nestjs/common';
import { FormationsController } from './formations.controller';
import { FormationsService } from './formations.service';
import { FormationSchema, Formation } from '../schemas/formations.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Formation.name, schema: FormationSchema },
    ]),
  ],
  controllers: [FormationsController],
  providers: [FormationsService],
})
export class FormationsModule {}
