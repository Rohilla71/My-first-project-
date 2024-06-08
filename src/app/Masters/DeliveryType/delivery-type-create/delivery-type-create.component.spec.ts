import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryTypeCreateComponent } from './delivery-type-create.component';

describe('DeliveryTypeCreateComponent', () => {
  let component: DeliveryTypeCreateComponent;
  let fixture: ComponentFixture<DeliveryTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryTypeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
