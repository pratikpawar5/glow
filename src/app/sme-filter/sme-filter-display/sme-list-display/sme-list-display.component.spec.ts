import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeListDisplayComponent } from './sme-list-display.component';

describe('SmeListDisplayComponent', () => {
  let component: SmeListDisplayComponent;
  let fixture: ComponentFixture<SmeListDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeListDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
