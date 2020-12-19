import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeProfileComponent } from './sme-profile.component';

describe('SmeProfileComponent', () => {
  let component: SmeProfileComponent;
  let fixture: ComponentFixture<SmeProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
