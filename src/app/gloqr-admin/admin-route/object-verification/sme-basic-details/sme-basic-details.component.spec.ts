import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeBasicDetailsComponent } from './sme-basic-details.component';

describe('SmeBasicDetailsComponent', () => {
  let component: SmeBasicDetailsComponent;
  let fixture: ComponentFixture<SmeBasicDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeBasicDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
