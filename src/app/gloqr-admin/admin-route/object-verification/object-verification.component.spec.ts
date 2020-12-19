import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectVerificationComponent } from './object-verification.component';

describe('ObjectVerificationComponent', () => {
  let component: ObjectVerificationComponent;
  let fixture: ComponentFixture<ObjectVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
