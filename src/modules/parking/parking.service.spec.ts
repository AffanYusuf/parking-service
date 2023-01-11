import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ParkingsEntity } from '@src/entities';
import { PARKING_LIST_RESPONSE, PARKING_REQUEST } from '@src/mock-test-data';
import { BaseResponse, DefaultResponse } from '@src/utils';
import { ParkingListResponseDto, ParkingSaveRequestDto } from './dto';
import { ParkingService } from './parking.service';

describe('ParkingService', () => {
  let service: ParkingService;

  const mockParking = {
		find: jest.fn(),
		save: jest.fn(),
	};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParkingService,
        {
					provide: getRepositoryToken(ParkingsEntity),
					useValue: mockParking,
				},
      ],
    }).compile();

    service = module.get<ParkingService>(ParkingService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('get parking list', async () => {
		mockParking.find.mockImplementationOnce(() => [PARKING_LIST_RESPONSE]);
		const response: BaseResponse<ParkingListResponseDto> = new DefaultResponse([PARKING_LIST_RESPONSE]);

		await expect(
			service.getList({}),
		).resolves.toStrictEqual(response);
	});


  test('save parking', async () => {
    const body: ParkingSaveRequestDto & ParkingsEntity = PARKING_REQUEST;
		const response: BaseResponse<ParkingSaveRequestDto & ParkingsEntity> = new DefaultResponse(body, 'Success save data', HttpStatus.CREATED);
		
    mockParking.save.mockImplementationOnce(() => body);

		await expect(service.save(body)).resolves.toStrictEqual(response);
	});
});
