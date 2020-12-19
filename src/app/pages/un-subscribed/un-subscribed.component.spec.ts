import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnSubscribedComponent } from './un-subscribed.component';

describe('UnSubscribedComponent', () => {
  let component: UnSubscribedComponent;
  let fixture: ComponentFixture<UnSubscribedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnSubscribedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnSubscribedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
