import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeAdminPageComponent } from './sme-admin-page.component';

describe('SmeAdminPageComponent', () => {
  let component: SmeAdminPageComponent;
  let fixture: ComponentFixture<SmeAdminPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeAdminPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
