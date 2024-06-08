import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSizeListComponent } from './vehicle-size-list.component';

describe('VehicleSizeListComponent', () => {
  let component: VehicleSizeListComponent;
  let fixture: ComponentFixture<VehicleSizeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleSizeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleSizeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
