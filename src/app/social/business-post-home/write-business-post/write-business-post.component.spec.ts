import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteBusinessPostComponent } from './write-business-post.component';

describe('WriteBusinessPostComponent', () => {
  let component: WriteBusinessPostComponent;
  let fixture: ComponentFixture<WriteBusinessPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteBusinessPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteBusinessPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
