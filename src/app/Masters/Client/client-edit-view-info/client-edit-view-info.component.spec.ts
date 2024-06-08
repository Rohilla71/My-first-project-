import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEditViewInfoComponent } from './client-edit-view-info.component';

describe('ClientEditViewInfoComponent', () => {
  let component: ClientEditViewInfoComponent;
  let fixture: ComponentFixture<ClientEditViewInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientEditViewInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientEditViewInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
