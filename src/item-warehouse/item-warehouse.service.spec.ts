import { Test, TestingModule } from '@nestjs/testing';
import { ItemWarehouseService } from './item-warehouse.service';

describe('ItemWarehouseService', () => {
  let service: ItemWarehouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemWarehouseService],
    }).compile();

    service = module.get<ItemWarehouseService>(ItemWarehouseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
