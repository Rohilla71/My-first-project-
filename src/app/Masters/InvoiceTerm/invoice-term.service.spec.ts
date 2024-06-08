import { TestBed } from '@angular/core/testing';

import { InvoiceTermService } from './invoice-term.service';

describe('InvoiceTermService', () => {
  let service: InvoiceTermService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceTermService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
