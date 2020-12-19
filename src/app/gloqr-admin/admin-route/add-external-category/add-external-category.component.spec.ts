import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExternalCategoryComponent } from './add-external-category.component';

describe('AddExternalCategoryComponent', () => {
  let component: AddExternalCategoryComponent;
  let fixture: ComponentFixture<AddExternalCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExternalCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExternalCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
