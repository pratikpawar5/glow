import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeCertificatesComponent } from './sme-certificates.component';

describe('SmeCertificatesComponent', () => {
  let component: SmeCertificatesComponent;
  let fixture: ComponentFixture<SmeCertificatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeCertificatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
