import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConnectionBreadCrumbsComponent } from './my-connection-bread-crumbs.component';

describe('MyConnectionBreadCrumbsComponent', () => {
  let component: MyConnectionBreadCrumbsComponent;
  let fixture: ComponentFixture<MyConnectionBreadCrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyConnectionBreadCrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyConnectionBreadCrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
