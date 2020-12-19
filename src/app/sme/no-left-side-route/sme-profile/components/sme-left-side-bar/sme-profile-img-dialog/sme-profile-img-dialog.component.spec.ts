import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeProfileImgDialogComponent } from './sme-profile-img-dialog.component';

describe('SmeProfileImgDialogComponent', () => {
  let component: SmeProfileImgDialogComponent;
  let fixture: ComponentFixture<SmeProfileImgDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeProfileImgDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeProfileImgDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
