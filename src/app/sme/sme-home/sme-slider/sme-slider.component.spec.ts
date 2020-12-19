import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeSliderComponent } from './sme-slider.component';

describe('SmeSliderComponent', () => {
  let component: SmeSliderComponent;
  let fixture: ComponentFixture<SmeSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
