import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeSearchFilterComponent } from './sme-search-filter.component';

describe('SmeSearchFilterComponent', () => {
  let component: SmeSearchFilterComponent;
  let fixture: ComponentFixture<SmeSearchFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeSearchFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
