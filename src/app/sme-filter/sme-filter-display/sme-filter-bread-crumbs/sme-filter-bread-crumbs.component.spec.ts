import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeFilterBreadCrumbsComponent } from './sme-filter-bread-crumbs.component';

describe('SmeFilterBreadCrumbsComponent', () => {
  let component: SmeFilterBreadCrumbsComponent;
  let fixture: ComponentFixture<SmeFilterBreadCrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeFilterBreadCrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeFilterBreadCrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
