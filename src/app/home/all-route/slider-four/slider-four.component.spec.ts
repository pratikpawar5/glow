import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderFourComponent } from './slider-four.component';

describe('SliderFourComponent', () => {
  let component: SliderFourComponent;
  let fixture: ComponentFixture<SliderFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
