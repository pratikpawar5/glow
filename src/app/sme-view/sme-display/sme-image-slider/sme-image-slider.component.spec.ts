import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeImageSliderComponent } from './sme-image-slider.component';

describe('SmeImageSliderComponent', () => {
  let component: SmeImageSliderComponent;
  let fixture: ComponentFixture<SmeImageSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeImageSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeImageSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
