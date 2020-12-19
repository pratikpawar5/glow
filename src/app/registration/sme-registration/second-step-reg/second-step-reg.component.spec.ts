import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondStepRegComponent } from './second-step-reg.component';

describe('SecondStepRegComponent', () => {
  let component: SecondStepRegComponent;
  let fixture: ComponentFixture<SecondStepRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondStepRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondStepRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
