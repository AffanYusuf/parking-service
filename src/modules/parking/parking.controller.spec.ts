import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ParkingsEntity } from '@src/entities';
import { PARKING_LIST_RESPONSE, PARKING_REQUEST } from '@src/mock-test-data';
import { BaseResponse, DefaultResponse } from '@src/utils';
import { ParkingListResponseDto, ParkingSaveRequestDto } from './dto';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';

describe('ParkingController', () => {
  let controller: ParkingController;
  let service: ParkingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingController],
      providers: [
				ParkingService,
				{
					provide: getRepositoryToken(ParkingsEntity),
					useValue: jest.fn(),
				},
			],
    }).compile();

    controller = module.get<ParkingController>(ParkingController);
    service = module.get<ParkingService>(ParkingService);
  });

  test('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('get parking list', async () => {
		const response: BaseResponse<ParkingListResponseDto> = new DefaultResponse(PARKING_LIST_RESPONSE);

		jest.spyOn(service, 'getList').mockResolvedValueOnce(response);

		await expect(
			controller.getList({}),
		).resolves.toStrictEqual(response);
	});

  test('save parking', async () => {
    const response: BaseResponse<ParkingListResponseDto> = new DefaultResponse(PARKING_LIST_RESPONSE);

		const body: ParkingSaveRequestDto = PARKING_REQUEST;

		jest.spyOn(service, 'save').mockResolvedValueOnce(response);

		await expect(controller.save(body)).resolves.toStrictEqual(
			response,
		);
	});
});
