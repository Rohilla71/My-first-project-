import { TestBed } from '@angular/core/testing';

import { CreateCustomerService } from '../../Masters/Customer/create-customer.service';

describe('CreateCustomerService', () => {
  let service: CreateCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
