import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeViewHeaderComponent } from './sme-view-header.component';

describe('SmeViewHeaderComponent', () => {
  let component: SmeViewHeaderComponent;
  let fixture: ComponentFixture<SmeViewHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeViewHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeViewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
