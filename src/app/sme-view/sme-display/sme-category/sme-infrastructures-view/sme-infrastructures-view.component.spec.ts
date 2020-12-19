import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeInfrastructuresViewComponent } from './sme-infrastructures-view.component';

describe('SmeInfrastructuresViewComponent', () => {
  let component: SmeInfrastructuresViewComponent;
  let fixture: ComponentFixture<SmeInfrastructuresViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeInfrastructuresViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeInfrastructuresViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
