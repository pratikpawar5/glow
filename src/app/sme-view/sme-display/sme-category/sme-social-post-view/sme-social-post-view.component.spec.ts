import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeSocialPostViewComponent } from './sme-social-post-view.component';

describe('SmeSocialPostViewComponent', () => {
  let component: SmeSocialPostViewComponent;
  let fixture: ComponentFixture<SmeSocialPostViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeSocialPostViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeSocialPostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
