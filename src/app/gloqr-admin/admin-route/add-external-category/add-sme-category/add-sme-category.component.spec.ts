import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSmeCategoryComponent } from './add-sme-category.component';

describe('AddSmeCategoryComponent', () => {
  let component: AddSmeCategoryComponent;
  let fixture: ComponentFixture<AddSmeCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSmeCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSmeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
