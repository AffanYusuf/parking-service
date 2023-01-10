import { Controller, Get, Query } from '@nestjs/common';
import { BaseResponse } from '@src/utils';
import { ParkingListRequestDto, ParkingListResponseDto } from './dto';
import { ParkingService } from './parking.service';

@Controller('parking')
export class ParkingController {
    constructor(
        private readonly parkingService: ParkingService,
    ) {}

    @Get()
    public async getParkingList(@Query() queryParams: ParkingListRequestDto): Promise<BaseResponse<ParkingListResponseDto>> {
        return this.parkingService.getParkingList(queryParams);
    }
}
