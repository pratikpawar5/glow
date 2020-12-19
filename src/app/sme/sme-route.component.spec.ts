import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeRouteComponent } from './sme-route.component';

describe('SmeRouteComponent', () => {
  let component: SmeRouteComponent;
  let fixture: ComponentFixture<SmeRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SmeRouteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
