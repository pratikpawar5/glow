import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceBreadcrumbsComponent } from './service-breadcrumbs.component';

describe('ServiceBreadcrumbsComponent', () => {
  let component: ServiceBreadcrumbsComponent;
  let fixture: ComponentFixture<ServiceBreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceBreadcrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
