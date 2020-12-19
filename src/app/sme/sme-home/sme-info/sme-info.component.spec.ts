import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeInfoComponent } from './sme-info.component';

describe('SmeInfoComponent', () => {
  let component: SmeInfoComponent;
  let fixture: ComponentFixture<SmeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
