import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeGalleriesViewComponent } from './sme-galleries-view.component';

describe('SmeGalleriesViewComponent', () => {
  let component: SmeGalleriesViewComponent;
  let fixture: ComponentFixture<SmeGalleriesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeGalleriesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeGalleriesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
