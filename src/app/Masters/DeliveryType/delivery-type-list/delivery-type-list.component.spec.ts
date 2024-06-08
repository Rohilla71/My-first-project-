import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryTypeListComponent } from './delivery-type-list.component';

describe('DeliveryTypeListComponent', () => {
  let component: DeliveryTypeListComponent;
  let fixture: ComponentFixture<DeliveryTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryTypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
