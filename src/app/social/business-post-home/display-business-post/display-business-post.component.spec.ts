import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBusinessPostComponent } from './display-business-post.component';

describe('DisplayBusinessPostComponent', () => {
  let component: DisplayBusinessPostComponent;
  let fixture: ComponentFixture<DisplayBusinessPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayBusinessPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBusinessPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
