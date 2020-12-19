import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInfrastrcutureComponent } from './add-infrastrcuture.component';

describe('AddInfrastrcutureComponent', () => {
  let component: AddInfrastrcutureComponent;
  let fixture: ComponentFixture<AddInfrastrcutureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInfrastrcutureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInfrastrcutureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
