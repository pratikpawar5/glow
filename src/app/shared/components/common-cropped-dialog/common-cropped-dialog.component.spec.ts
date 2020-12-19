import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCroppedDialogComponent } from './common-cropped-dialog.component';

describe('CommonCroppedDialogComponent', () => {
  let component: CommonCroppedDialogComponent;
  let fixture: ComponentFixture<CommonCroppedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonCroppedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonCroppedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
