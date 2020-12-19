import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInfrastrcutureComponent } from './update-infrastrcuture.component';

describe('UpdateInfrastrcutureComponent', () => {
  let component: UpdateInfrastrcutureComponent;
  let fixture: ComponentFixture<UpdateInfrastrcutureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInfrastrcutureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInfrastrcutureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
