import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeServicesViewComponent } from './sme-services-view.component';

describe('SmeServicesViewComponent', () => {
  let component: SmeServicesViewComponent;
  let fixture: ComponentFixture<SmeServicesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeServicesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeServicesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
