import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderFiveComponent } from './slider-five.component';

describe('SliderFiveComponent', () => {
  let component: SliderFiveComponent;
  let fixture: ComponentFixture<SliderFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
