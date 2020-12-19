import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeLeftSideBarComponent } from './sme-left-side-bar.component';

describe('SmeLeftSideBarComponent', () => {
  let component: SmeLeftSideBarComponent;
  let fixture: ComponentFixture<SmeLeftSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeLeftSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeLeftSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
