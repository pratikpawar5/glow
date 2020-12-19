import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CroppedImageComponent } from './cropped-image.component';

describe('CroppedImageComponent', () => {
  let component: CroppedImageComponent;
  let fixture: ComponentFixture<CroppedImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CroppedImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CroppedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
