import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEditViewContactDetailsComponent } from './client-edit-view-contact-details.component';

describe('ClientEditViewContactDetailsComponent', () => {
  let component: ClientEditViewContactDetailsComponent;
  let fixture: ComponentFixture<ClientEditViewContactDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientEditViewContactDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientEditViewContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
