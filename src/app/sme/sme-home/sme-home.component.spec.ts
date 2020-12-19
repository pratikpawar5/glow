import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeHomeComponent } from './sme-home.component';

describe('SmeHomeComponent', () => {
  let component: SmeHomeComponent;
  let fixture: ComponentFixture<SmeHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
