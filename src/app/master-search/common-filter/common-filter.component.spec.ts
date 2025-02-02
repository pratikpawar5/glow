import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonFilterComponent } from './common-filter.component';

describe('ProductFilterComponent', () => {
  let component: CommonFilterComponent;
  let fixture: ComponentFixture<CommonFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
