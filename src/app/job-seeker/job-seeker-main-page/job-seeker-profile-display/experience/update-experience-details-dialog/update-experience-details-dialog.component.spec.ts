import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExperienceDetailsDialogComponent } from './update-experience-details-dialog.component';

describe('UpdateExperienceDetailsDialogComponent', () => {
  let component: UpdateExperienceDetailsDialogComponent;
  let fixture: ComponentFixture<UpdateExperienceDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateExperienceDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateExperienceDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
