import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeLeftMenuComponent } from './sme-left-menu.component';

describe('SmeLeftMenuComponent', () => {
  let component: SmeLeftMenuComponent;
  let fixture: ComponentFixture<SmeLeftMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeLeftMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
