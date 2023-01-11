import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VEHICLE_TYPE } from '@src/constants';
import { ParkingsEntity } from '@src/entities';
import { VehicleTypeEnum } from '@src/enums';
import { BaseResponse, DefaultResponse } from '@src/utils';
import { Between, In, Repository } from 'typeorm';
import { ParkingListRequestDto, ParkingListResponseDto, ParkingSaveRequestDto } from './dto';

@Injectable()
export class ParkingService {
    constructor(
        @InjectRepository(ParkingsEntity)
        private readonly parkingsRepository: Repository<ParkingsEntity>,
    ) {}

    public async getList(queryParams: ParkingListRequestDto): Promise<BaseResponse<ParkingListResponseDto>> {
        try {
            const where = this.prepareWhereQueryParkingList(queryParams);
            const response = await this.parkingsRepository.find({where});

            return new DefaultResponse(response);
        } catch (error) {
            throw new Error(error);
        }
    }

    private prepareWhereQueryParkingList(
		queryParams: ParkingListRequestDto,
	) {
        try {
            const where = {};
            const {vehicleType, checkInFrom, checkInTo, priceFrom, priceTo} = queryParams;
            
            if (vehicleType) where['vehicleType'] = In(vehicleType);
            if (checkInFrom && checkInTo) {
                const {checkInFromDate, checkInToDate} = this.formatDateCheckIn(checkInFrom, checkInTo);
                where['checkIn'] = Between(checkInFromDate, checkInToDate);
            } else if (checkInFrom && !checkInTo) {
                where['checkIn'] = new Date(checkInFrom);
            } else if (!checkInFrom && checkInTo) {
                where['checkIn'] = new Date(checkInTo);
            } 
            if (priceFrom && priceTo) where['price'] = Between(Number(priceFrom), Number(priceTo));

            return where;
        } catch (error) {
            throw new Error(error); 
        }
	}

    private formatDateCheckIn(checkInFrom: string, checkInTo: string) {
        try {
            const checkInFromLength = checkInFrom.split(' ').length;
            const checkInToLength = checkInTo.split(' ').length;
            const checkInFromDate = checkInFromLength > 1 ? new Date(checkInFrom) : new Date(`${checkInFrom} 00:00:00`);        
            const checkInToDate = checkInToLength > 1 ? new Date(checkInTo) : new Date(`${checkInTo} 23:59:59`);        
            
            return {checkInFromDate, checkInToDate};
        } catch (error) {
            throw new Error(error);
        }
    }

    public async save(body: ParkingSaveRequestDto): Promise<BaseResponse<ParkingListResponseDto>> {
        try {
            const {vehicleType, checkIn, checkOut} = body;
            const calculatePrice = this.calculatePrice(checkIn, checkOut, vehicleType);
            
            body.price = calculatePrice;
            const save = await this.parkingsRepository.save(body);
            return new DefaultResponse(
				save,
				'Success save data',
                HttpStatus.CREATED
			);
            
        } catch (error) {
            throw new Error(error);
            
        }
    }

    private calculatePrice(checkIn: Date, checkOut: Date, vehicleType: VehicleTypeEnum) {

        const checkInTime = new Date(checkIn).getTime();
        const checkOutTime = new Date(checkOut).getTime();
        let delta = Math.abs(checkOutTime - checkInTime) / 1000;

        const days = Math.floor(delta / 86400);
        delta -= days * 86400;

        const hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        const minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        const seconds = delta % 60; 

        const priceInDays = VEHICLE_TYPE[vehicleType].DAY * days;
        const minutesAndSecond = (minutes*60) + seconds;
        const priceInHours = minutesAndSecond > 60 ? 
            (VEHICLE_TYPE[vehicleType].HOUR * (hours+1)) : 
            VEHICLE_TYPE[vehicleType].HOUR * hours;

        const totalPrice = priceInDays + priceInHours;

        return totalPrice;
    }

}
