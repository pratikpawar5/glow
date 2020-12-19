import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentRequestBreadCrumbsComponent } from './sent-request-bread-crumbs.component';

describe('SentRequestBreadCrumbsComponent', () => {
  let component: SentRequestBreadCrumbsComponent;
  let fixture: ComponentFixture<SentRequestBreadCrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentRequestBreadCrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentRequestBreadCrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
