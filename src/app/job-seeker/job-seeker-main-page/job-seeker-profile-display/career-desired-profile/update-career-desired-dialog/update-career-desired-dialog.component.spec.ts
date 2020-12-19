import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCareerDesiredDialogComponent } from './update-career-desired-dialog.component';

describe('UpdateCareerDesiredDialogComponent', () => {
  let component: UpdateCareerDesiredDialogComponent;
  let fixture: ComponentFixture<UpdateCareerDesiredDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCareerDesiredDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCareerDesiredDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
