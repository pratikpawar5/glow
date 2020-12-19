import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExperienceDetailsDialogComponent } from './create-experience-details-dialog.component';

describe('CreateExperienceDetailsDialogComponent', () => {
  let component: CreateExperienceDetailsDialogComponent;
  let fixture: ComponentFixture<CreateExperienceDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateExperienceDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExperienceDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
