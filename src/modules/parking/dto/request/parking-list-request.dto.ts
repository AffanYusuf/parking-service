import { VehicleTypeEnum } from '@src/enums';
import {IsOptional, IsString} from 'class-validator';

export class ParkingListRequestDto {
    @IsString()
    @IsOptional()
	vehicleType?: string[];

	@IsString()
    @IsOptional()
	checkInFrom?: string;

    @IsString()
    @IsOptional()
	checkInTo?: string;

	@IsString()
    @IsOptional()
	priceFrom?: string;

    @IsString()
    @IsOptional()
	priceTo?: string;
}
