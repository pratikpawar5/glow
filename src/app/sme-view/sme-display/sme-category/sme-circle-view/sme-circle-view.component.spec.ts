import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeCircleViewComponent } from './sme-circle-view.component';

describe('SmeCircleViewComponent', () => {
  let component: SmeCircleViewComponent;
  let fixture: ComponentFixture<SmeCircleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeCircleViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeCircleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
