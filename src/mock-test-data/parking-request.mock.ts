import { ParkingsEntity } from "@src/entities";
import { VehicleTypeEnum } from "@src/enums";
import { ParkingSaveRequestDto } from "@src/modules/parking/dto";

export const PARKING_REQUEST: ParkingSaveRequestDto & ParkingsEntity = {
    id: 1,
	vehicleType: VehicleTypeEnum.MOTORCYCLE,
	vehicleNumber: "F12345AB",
	checkIn: new Date(),
	checkOut: new Date(),
	price: 5000
}

