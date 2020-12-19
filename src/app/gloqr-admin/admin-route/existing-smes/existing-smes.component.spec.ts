import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingSmesComponent } from './existing-smes.component';

describe('ExistingSmesComponent', () => {
  let component: ExistingSmesComponent;
  let fixture: ComponentFixture<ExistingSmesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingSmesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingSmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
