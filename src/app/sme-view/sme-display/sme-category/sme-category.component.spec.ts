import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeCategoryComponent } from './sme-category.component';

describe('SmeCategoryComponent', () => {
  let component: SmeCategoryComponent;
  let fixture: ComponentFixture<SmeCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
