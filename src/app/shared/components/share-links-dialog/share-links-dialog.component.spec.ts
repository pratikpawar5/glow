import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareLinksDialogComponent } from './share-links-dialog.component';

describe('ShareLinksDialogComponent', () => {
  let component: ShareLinksDialogComponent;
  let fixture: ComponentFixture<ShareLinksDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareLinksDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareLinksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
