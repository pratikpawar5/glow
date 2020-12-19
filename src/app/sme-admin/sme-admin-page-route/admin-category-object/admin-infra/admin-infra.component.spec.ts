import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInfraComponent } from './admin-infra.component';

describe('AdminInfraComponent', () => {
  let component: AdminInfraComponent;
  let fixture: ComponentFixture<AdminInfraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInfraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInfraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
