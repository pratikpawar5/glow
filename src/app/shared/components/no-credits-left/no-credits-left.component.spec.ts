import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCreditsLeftComponent } from './no-credits-left.component';

describe('NoCreditsLeftComponent', () => {
  let component: NoCreditsLeftComponent;
  let fixture: ComponentFixture<NoCreditsLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoCreditsLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoCreditsLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
