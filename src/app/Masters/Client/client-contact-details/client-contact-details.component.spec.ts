import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContactDetailsComponent } from './client-contact-details.component';

describe('ClientContactDetailsComponent', () => {
  let component: ClientContactDetailsComponent;
  let fixture: ComponentFixture<ClientContactDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientContactDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
