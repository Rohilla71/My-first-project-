import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTermCreateComponent } from './invoice-term-create.component';

describe('InvoiceTermCreateComponent', () => {
  let component: InvoiceTermCreateComponent;
  let fixture: ComponentFixture<InvoiceTermCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceTermCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceTermCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
