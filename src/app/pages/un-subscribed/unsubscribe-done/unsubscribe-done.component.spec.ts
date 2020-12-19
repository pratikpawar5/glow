import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeDoneComponent } from './unsubscribe-done.component';

describe('UnsubscribeDoneComponent', () => {
  let component: UnsubscribeDoneComponent;
  let fixture: ComponentFixture<UnsubscribeDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsubscribeDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsubscribeDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
