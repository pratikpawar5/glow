import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBreadcrumbsComponent } from './product-breadcrumbs.component';

describe('ProductBreadcrumbsComponent', () => {
  let component: ProductBreadcrumbsComponent;
  let fixture: ComponentFixture<ProductBreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBreadcrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
