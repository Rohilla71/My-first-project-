import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryStatusListComponent } from './delivery-status-list.component';

describe('DeliveryStatusListComponent', () => {
  let component: DeliveryStatusListComponent;
  let fixture: ComponentFixture<DeliveryStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryStatusListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
