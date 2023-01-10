import { VehicleTypeEnum } from "@src/enums";

export class ParkingListResponseDto {
	id: number;
	vehicleType: VehicleTypeEnum;
	vehicleNumber: string;
	checkIn: Date;
	checkOut: Date;
	price: number;
}
