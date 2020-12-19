import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEducationalDetailsDialogComponent } from './create-educational-details-dialog.component';

describe('CreateEducationalDetailsDialogComponent', () => {
  let component: CreateEducationalDetailsDialogComponent;
  let fixture: ComponentFixture<CreateEducationalDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEducationalDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEducationalDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
