import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeWebHomeContentComponent } from './sme-web-home-content.component';

describe('SmeWebHomeContentComponent', () => {
  let component: SmeWebHomeContentComponent;
  let fixture: ComponentFixture<SmeWebHomeContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeWebHomeContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeWebHomeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
