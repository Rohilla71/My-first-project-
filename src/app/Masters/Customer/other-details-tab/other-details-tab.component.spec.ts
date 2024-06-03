import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherDetailsTabComponent } from './other-details-tab.component';

describe('OtherDetailsTabComponent', () => {
  let component: OtherDetailsTabComponent;
  let fixture: ComponentFixture<OtherDetailsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherDetailsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherDetailsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
