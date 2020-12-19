import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRouteComponent } from './all-route.component';

describe('AllRouteComponent', () => {
  let component: AllRouteComponent;
  let fixture: ComponentFixture<AllRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
