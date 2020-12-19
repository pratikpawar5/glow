import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteObjectsComponent } from './delete-objects.component';

describe('DeleteObjectsComponent', () => {
  let component: DeleteObjectsComponent;
  let fixture: ComponentFixture<DeleteObjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteObjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
