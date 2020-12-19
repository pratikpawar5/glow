import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeHomeHeaderComponent } from './sme-home-header.component';

describe('SmeHomeHeaderComponent', () => {
  let component: SmeHomeHeaderComponent;
  let fixture: ComponentFixture<SmeHomeHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeHomeHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeHomeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
