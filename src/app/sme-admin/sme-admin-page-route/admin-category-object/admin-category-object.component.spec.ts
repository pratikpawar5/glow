import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryObjectComponent } from './admin-category-object.component';

describe('AdminCategoryObjectComponent', () => {
  let component: AdminCategoryObjectComponent;
  let fixture: ComponentFixture<AdminCategoryObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCategoryObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoryObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
