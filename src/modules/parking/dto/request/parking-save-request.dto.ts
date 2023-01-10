import { VehicleTypeEnum } from '@src/enums';
import {IsDate, IsString} from 'class-validator';

export class ParkingSaveRequestDto {
    @IsString()
	vehicleType: VehicleTypeEnum;

    @IsString()
    vehicleNumber: string;

	@IsDate()
	checkIn: Date;

    @IsDate()
	checkOut: Date;

	price: number;

}
