import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpSliderComponent } from './pop-up-slider.component';

describe('PopUpSliderComponent', () => {
  let component: PopUpSliderComponent;
  let fixture: ComponentFixture<PopUpSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
