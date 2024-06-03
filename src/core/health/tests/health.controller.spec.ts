import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '../health.controller';
import { HealthService } from '../health.service';

describe('HealthController', () => {
  let controller: HealthController;
  let service: DeepMocked<HealthService>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    })
      .useMocker(createMock)
      .compile();

    service = moduleRef.get(HealthService);
    controller = moduleRef.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should status return data', () => {
    service.getStatus.mockReturnValue({
      status: 'Running',
      uptime: `1 seconds`,
      dateTime: '',
      logLevels: [],
    });
    expect(controller.status()).toBeTruthy();
  });
});
