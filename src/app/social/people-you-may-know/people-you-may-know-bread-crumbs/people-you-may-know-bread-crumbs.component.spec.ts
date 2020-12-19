import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleYouMayKnowBreadCrumbsComponent } from './people-you-may-know-bread-crumbs.component';

describe('PeopleYouMayKnowBreadCrumbsComponent', () => {
  let component: PeopleYouMayKnowBreadCrumbsComponent;
  let fixture: ComponentFixture<PeopleYouMayKnowBreadCrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleYouMayKnowBreadCrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleYouMayKnowBreadCrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
