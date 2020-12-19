import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesssageFromRecruiterComponent } from './messsage-from-recruiter.component';

describe('MesssageFromRecruiterComponent', () => {
  let component: MesssageFromRecruiterComponent;
  let fixture: ComponentFixture<MesssageFromRecruiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesssageFromRecruiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesssageFromRecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
