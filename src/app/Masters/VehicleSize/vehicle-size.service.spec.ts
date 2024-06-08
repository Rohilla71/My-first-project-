import { TestBed } from '@angular/core/testing';

import { VehicleSizeService } from './vehicle-size.service';

describe('VehicleSizeService', () => {
  let service: VehicleSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
