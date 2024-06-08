import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostalCodeListComponent } from './postal-code-list.component';

describe('PostalCodeListComponent', () => {
  let component: PostalCodeListComponent;
  let fixture: ComponentFixture<PostalCodeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostalCodeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostalCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
