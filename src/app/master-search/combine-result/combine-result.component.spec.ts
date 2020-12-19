import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombineResultComponent } from './combine-result.component';

describe('CombineResultComponent', () => {
  let component: CombineResultComponent;
  let fixture: ComponentFixture<CombineResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombineResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombineResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
