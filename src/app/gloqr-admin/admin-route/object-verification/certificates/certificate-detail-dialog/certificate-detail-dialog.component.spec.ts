import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateDetailDialogComponent } from './certificate-detail-dialog.component';

describe('CertificateDetailDialogComponent', () => {
  let component: CertificateDetailDialogComponent;
  let fixture: ComponentFixture<CertificateDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificateDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
