import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeServicesComponent } from './sme-services.component';

describe('SmeServicesComponent', () => {
  let component: SmeServicesComponent;
  let fixture: ComponentFixture<SmeServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
