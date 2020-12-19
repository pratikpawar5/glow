import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRequestHomeComponent } from './pending-request-home.component';

describe('PendingRequestHomeComponent', () => {
  let component: PendingRequestHomeComponent;
  let fixture: ComponentFixture<PendingRequestHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingRequestHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingRequestHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
