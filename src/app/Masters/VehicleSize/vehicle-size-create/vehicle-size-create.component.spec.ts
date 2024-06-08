import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSizeCreateComponent } from './vehicle-size-create.component';

describe('VehicleSizeCreateComponent', () => {
  let component: VehicleSizeCreateComponent;
  let fixture: ComponentFixture<VehicleSizeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleSizeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleSizeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
