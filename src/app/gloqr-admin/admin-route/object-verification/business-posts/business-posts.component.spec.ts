import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPostsComponent } from './business-posts.component';

describe('BusinessPostsComponent', () => {
  let component: BusinessPostsComponent;
  let fixture: ComponentFixture<BusinessPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
