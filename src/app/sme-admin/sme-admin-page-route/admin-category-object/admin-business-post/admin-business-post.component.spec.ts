import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBusinessPostComponent } from './admin-business-post.component';

describe('AdminBusinessPostComponent', () => {
  let component: AdminBusinessPostComponent;
  let fixture: ComponentFixture<AdminBusinessPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBusinessPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBusinessPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
