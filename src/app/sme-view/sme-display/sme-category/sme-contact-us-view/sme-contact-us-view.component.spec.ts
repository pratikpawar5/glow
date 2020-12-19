import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeContactUsViewComponent } from './sme-contact-us-view.component';

describe('SmeContactUsViewComponent', () => {
  let component: SmeContactUsViewComponent;
  let fixture: ComponentFixture<SmeContactUsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeContactUsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeContactUsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
