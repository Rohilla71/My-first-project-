import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostalCodeCreateComponent } from './postal-code-create.component';

describe('PostalCodeCreateComponent', () => {
  let component: PostalCodeCreateComponent;
  let fixture: ComponentFixture<PostalCodeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostalCodeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostalCodeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
