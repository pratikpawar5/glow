import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBusinessPostComponent } from './update-business-post.component';

describe('UpdateBusinessPostComponent', () => {
  let component: UpdateBusinessPostComponent;
  let fixture: ComponentFixture<UpdateBusinessPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBusinessPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBusinessPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
