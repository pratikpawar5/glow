import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GloqrLoginComponent } from './gloqr-login.component';

describe('GloqrLoginComponent', () => {
  let component: GloqrLoginComponent;
  let fixture: ComponentFixture<GloqrLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GloqrLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GloqrLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
