import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeDisplayComponent } from './sme-display.component';

describe('SmeDisplayComponent', () => {
  let component: SmeDisplayComponent;
  let fixture: ComponentFixture<SmeDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
