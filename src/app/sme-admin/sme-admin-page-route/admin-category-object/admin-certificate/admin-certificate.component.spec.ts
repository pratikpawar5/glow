import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCertificateComponent } from './admin-certificate.component';

describe('AdminCertificateComponent', () => {
  let component: AdminCertificateComponent;
  let fixture: ComponentFixture<AdminCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
