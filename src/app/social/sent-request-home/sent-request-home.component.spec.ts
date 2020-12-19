import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentRequestHomeComponent } from './sent-request-home.component';

describe('SentRequestHomeComponent', () => {
  let component: SentRequestHomeComponent;
  let fixture: ComponentFixture<SentRequestHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentRequestHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentRequestHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
