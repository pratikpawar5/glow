import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoLeftSideRouteComponent } from './no-left-side-route.component';

describe('NoLeftSideRouteComponent', () => {
  let component: NoLeftSideRouteComponent;
  let fixture: ComponentFixture<NoLeftSideRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoLeftSideRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoLeftSideRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
