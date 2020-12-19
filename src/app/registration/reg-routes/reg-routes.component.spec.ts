import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegRoutesComponent } from './reg-routes.component';

describe('RegRoutesComponent', () => {
  let component: RegRoutesComponent;
  let fixture: ComponentFixture<RegRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
