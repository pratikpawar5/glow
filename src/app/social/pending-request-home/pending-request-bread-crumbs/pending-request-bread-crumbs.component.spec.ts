import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRequestBreadCrumbsComponent } from './pending-request-bread-crumbs.component';

describe('PendingRequestBreadCrumbsComponent', () => {
  let component: PendingRequestBreadCrumbsComponent;
  let fixture: ComponentFixture<PendingRequestBreadCrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingRequestBreadCrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingRequestBreadCrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
