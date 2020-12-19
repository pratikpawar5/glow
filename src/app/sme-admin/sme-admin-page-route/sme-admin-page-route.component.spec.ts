import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeAdminPageRouteComponent } from './sme-admin-page-route.component';

describe('SmeAdminPageRouteComponent', () => {
  let component: SmeAdminPageRouteComponent;
  let fixture: ComponentFixture<SmeAdminPageRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeAdminPageRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeAdminPageRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
