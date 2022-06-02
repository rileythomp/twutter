import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupauthComponent } from './signupauth.component';

describe('SignupauthComponent', () => {
  let component: SignupauthComponent;
  let fixture: ComponentFixture<SignupauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupauthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
