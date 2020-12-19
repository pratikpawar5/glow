import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeCertificatesViewComponent } from './sme-certificates-view.component';

describe('SmeCertificatesViewComponent', () => {
  let component: SmeCertificatesViewComponent;
  let fixture: ComponentFixture<SmeCertificatesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeCertificatesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeCertificatesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
