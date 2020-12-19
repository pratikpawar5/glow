import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeFilterDisplayComponent } from './sme-filter-display.component';

describe('SmeFilterDisplayComponent', () => {
  let component: SmeFilterDisplayComponent;
  let fixture: ComponentFixture<SmeFilterDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeFilterDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeFilterDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
