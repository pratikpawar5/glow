import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeGalleryComponent } from './sme-gallery.component';

describe('SmeGalleryComponent', () => {
  let component: SmeGalleryComponent;
  let fixture: ComponentFixture<SmeGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
