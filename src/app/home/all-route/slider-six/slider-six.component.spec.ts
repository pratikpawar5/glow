import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderSixComponent } from './slider-six.component';

describe('SliderSixComponent', () => {
  let component: SliderSixComponent;
  let fixture: ComponentFixture<SliderSixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderSixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
