import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingsEntity } from '@src/entities';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingsEntity])],
  controllers: [ParkingController],
  providers: [ParkingService]
})
export class ParkingModule {}
