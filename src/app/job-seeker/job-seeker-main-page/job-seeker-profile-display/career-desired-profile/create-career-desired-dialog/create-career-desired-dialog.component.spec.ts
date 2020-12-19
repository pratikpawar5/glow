import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCareerDesiredDialogComponent } from './create-career-desired-dialog.component';

describe('CreateCareerDesiredDialogComponent', () => {
  let component: CreateCareerDesiredDialogComponent;
  let fixture: ComponentFixture<CreateCareerDesiredDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCareerDesiredDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCareerDesiredDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
