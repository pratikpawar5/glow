import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeInfrastructureComponent } from './sme-infrastructure.component';

describe('SmeInfrastructureComponent', () => {
  let component: SmeInfrastructureComponent;
  let fixture: ComponentFixture<SmeInfrastructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeInfrastructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeInfrastructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
