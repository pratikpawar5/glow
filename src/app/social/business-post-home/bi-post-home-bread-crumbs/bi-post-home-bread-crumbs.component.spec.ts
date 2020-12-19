import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiPostHomeBreadCrumbsComponent } from './bi-post-home-bread-crumbs.component';

describe('BiPostHomeBreadCrumbsComponent', () => {
  let component: BiPostHomeBreadCrumbsComponent;
  let fixture: ComponentFixture<BiPostHomeBreadCrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiPostHomeBreadCrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiPostHomeBreadCrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
