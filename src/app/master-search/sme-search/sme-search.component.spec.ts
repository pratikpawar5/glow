import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeSearchComponent } from './sme-search.component';

describe('SmeSearchComponent', () => {
  let component: SmeSearchComponent;
  let fixture: ComponentFixture<SmeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
