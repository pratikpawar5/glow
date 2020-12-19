import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailDialogComponent } from './service-detail-dialog.component';

describe('ServiceDetailDialogComponent', () => {
  let component: ServiceDetailDialogComponent;
  let fixture: ComponentFixture<ServiceDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
