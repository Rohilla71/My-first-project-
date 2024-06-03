import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUnitListComponent } from './create-unit-list.component';

describe('CreateUnitListComponent', () => {
  let component: CreateUnitListComponent;
  let fixture: ComponentFixture<CreateUnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUnitListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
