import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOnGloqrComponent } from './list-on-gloqr.component';

describe('ListOnGloqrComponent', () => {
  let component: ListOnGloqrComponent;
  let fixture: ComponentFixture<ListOnGloqrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOnGloqrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOnGloqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
