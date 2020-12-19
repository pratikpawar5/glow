import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConnectionHomeComponent } from './my-connection-home.component';

describe('MyConnectionHomeComponent', () => {
  let component: MyConnectionHomeComponent;
  let fixture: ComponentFixture<MyConnectionHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyConnectionHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyConnectionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
