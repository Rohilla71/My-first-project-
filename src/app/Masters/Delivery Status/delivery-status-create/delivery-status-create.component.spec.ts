import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryStatusCreateComponent } from './delivery-status-create.component';

describe('DeliveryStatusCreateComponent', () => {
  let component: DeliveryStatusCreateComponent;
  let fixture: ComponentFixture<DeliveryStatusCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryStatusCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryStatusCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
