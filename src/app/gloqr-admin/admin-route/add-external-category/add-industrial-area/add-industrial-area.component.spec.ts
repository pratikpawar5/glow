import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIndustrialAreaComponent } from './add-industrial-area.component';

describe('AddIndustrialAreaComponent', () => {
  let component: AddIndustrialAreaComponent;
  let fixture: ComponentFixture<AddIndustrialAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIndustrialAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIndustrialAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
