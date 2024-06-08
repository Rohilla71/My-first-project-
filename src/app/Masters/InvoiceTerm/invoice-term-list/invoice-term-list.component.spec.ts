import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTermListComponent } from './invoice-term-list.component';

describe('InvoiceTermListComponent', () => {
  let component: InvoiceTermListComponent;
  let fixture: ComponentFixture<InvoiceTermListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceTermListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceTermListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
