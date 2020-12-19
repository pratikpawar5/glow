import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeHomeFooterComponent } from './sme-home-footer.component';

describe('SmeHomeFooterComponent', () => {
  let component: SmeHomeFooterComponent;
  let fixture: ComponentFixture<SmeHomeFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeHomeFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeHomeFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
