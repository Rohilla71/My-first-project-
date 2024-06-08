import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityListTestComponent } from './city-list-test.component';

describe('CityListTestComponent', () => {
  let component: CityListTestComponent;
  let fixture: ComponentFixture<CityListTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityListTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityListTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
