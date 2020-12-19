import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryDetailDialogComponent } from './gallery-detail-dialog.component';

describe('GalleryDetailDialogComponent', () => {
  let component: GalleryDetailDialogComponent;
  let fixture: ComponentFixture<GalleryDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
