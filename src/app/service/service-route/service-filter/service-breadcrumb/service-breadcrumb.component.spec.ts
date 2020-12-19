import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceBreadcrumbComponent } from './service-breadcrumb.component';

describe('ServiceBreadcrumbComponent', () => {
  let component: ServiceBreadcrumbComponent;
  let fixture: ComponentFixture<ServiceBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
