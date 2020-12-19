import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeSearchResultComponent } from './sme-search-result.component';

describe('SmeSearchResultComponent', () => {
  let component: SmeSearchResultComponent;
  let fixture: ComponentFixture<SmeSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
