import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEducationalDetailsDialogComponent } from './update-educational-details-dialog.component';

describe('UpdateEducationalDetailsDialogComponent', () => {
  let component: UpdateEducationalDetailsDialogComponent;
  let fixture: ComponentFixture<UpdateEducationalDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEducationalDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEducationalDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
