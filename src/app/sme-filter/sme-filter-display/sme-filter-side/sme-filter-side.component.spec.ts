import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeFilterSideComponent } from './sme-filter-side.component';

describe('SmeFilterSideComponent', () => {
  let component: SmeFilterSideComponent;
  let fixture: ComponentFixture<SmeFilterSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeFilterSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeFilterSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
