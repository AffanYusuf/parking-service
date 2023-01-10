import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BaseResponse } from '@src/utils';
import { ParkingListRequestDto, ParkingListResponseDto, ParkingSaveRequestDto } from './dto';
import { ParkingService } from './parking.service';

@Controller('parking')
export class ParkingController {
    constructor(
        private readonly parkingService: ParkingService,
    ) {}

    @Get()
    public async getList(@Query() queryParams: ParkingListRequestDto): Promise<BaseResponse<ParkingListResponseDto>> {
        return this.parkingService.getList(queryParams);
    }

    @Post()
    public async save(@Body() body: ParkingSaveRequestDto): Promise<BaseResponse<ParkingListResponseDto>> {
        return this.parkingService.save(body);
    }
}
