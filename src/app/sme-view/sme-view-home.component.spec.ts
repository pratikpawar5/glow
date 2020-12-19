import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeViewHomeComponent } from './sme-view-home.component';

describe('SmeViewHomeComponent', () => {
  let component: SmeViewHomeComponent;
  let fixture: ComponentFixture<SmeViewHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeViewHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeViewHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
