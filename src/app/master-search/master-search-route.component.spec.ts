import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSearchRouteComponent } from './master-search-route.component';

describe('MasterSearchRouteComponent', () => {
  let component: MasterSearchRouteComponent;
  let fixture: ComponentFixture<MasterSearchRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSearchRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSearchRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
