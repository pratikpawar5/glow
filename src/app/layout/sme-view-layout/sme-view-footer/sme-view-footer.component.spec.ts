import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeViewFooterComponent } from './sme-view-footer.component';

describe('SmeViewFooterComponent', () => {
  let component: SmeViewFooterComponent;
  let fixture: ComponentFixture<SmeViewFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeViewFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeViewFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
