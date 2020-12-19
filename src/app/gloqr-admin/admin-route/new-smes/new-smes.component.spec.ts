import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSmesComponent } from './new-smes.component';

describe('NewSmesComponent', () => {
  let component: NewSmesComponent;
  let fixture: ComponentFixture<NewSmesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSmesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
