import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingsEntity } from '@src/entities';
import { BaseResponse, DefaultResponse } from '@src/utils';
import { Between, In, Repository } from 'typeorm';
import { ParkingListRequestDto, ParkingListResponseDto } from './dto';

@Injectable()
export class ParkingService {
    constructor(
        @InjectRepository(ParkingsEntity)
        private readonly parkingsRepository: Repository<ParkingsEntity>,
    ) {}

    public async getParkingList(queryParams: ParkingListRequestDto): Promise<BaseResponse<ParkingListResponseDto>> {
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
            const {checkInFromDate, checkInToDate} = this.formatDateCheckIn(checkInFrom, checkInTo);

            if (vehicleType) where['vehicleType'] = In(vehicleType);
            if (checkInFrom && !checkInTo) where['checkIn'] = checkInFrom;
            if (!checkInFrom && checkInTo) where['checkIn'] = checkInTo;
            if (checkInFrom && checkInTo) where['checkIn'] = Between(checkInFromDate, checkInToDate);
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

}
