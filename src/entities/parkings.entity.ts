import { VehicleTypeEnum } from '@src/enums';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('parkings', {schema: 'public'})
export class ParkingsEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
        type: "enum",
        enum: VehicleTypeEnum,
        default: VehicleTypeEnum.MOTORCYCLE,
    })
	vehicleType: VehicleTypeEnum;

    @Column()
	vehicleNumber: string;

	@Column()
	checkIn: Date;

	@Column()
	checkOut: Date;

	@Column()
	price: number;
}
