import { VehicleTypeEnum } from "@src/enums";
import { ParkingListResponseDto } from "@src/modules/parking/dto";

export const PARKING_LIST_RESPONSE: ParkingListResponseDto = {
	id: 2,
	vehicleType: VehicleTypeEnum.MOTORCYCLE,
	vehicleNumber: "F12345AB",
	checkIn: new Date(),
	checkOut: new Date(),
	price: 5000
}

