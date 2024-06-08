import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOtherDeailsComponent } from './client-other-deails.component';

describe('ClientOtherDeailsComponent', () => {
  let component: ClientOtherDeailsComponent;
  let fixture: ComponentFixture<ClientOtherDeailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientOtherDeailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientOtherDeailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
