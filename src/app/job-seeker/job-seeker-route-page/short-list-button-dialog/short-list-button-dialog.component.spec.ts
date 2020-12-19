import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortListButtonDialogComponent } from './short-list-button-dialog.component';

describe('ShortListButtonDialogComponent', () => {
  let component: ShortListButtonDialogComponent;
  let fixture: ComponentFixture<ShortListButtonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortListButtonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortListButtonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
