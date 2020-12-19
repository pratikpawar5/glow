import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeVerifyComponent } from './sme-verify.component';

describe('SmeVerifyComponent', () => {
  let component: SmeVerifyComponent;
  let fixture: ComponentFixture<SmeVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
