import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPostHomeComponent } from './business-post-home.component';

describe('BusinessPostHomeComponent', () => {
  let component: BusinessPostHomeComponent;
  let fixture: ComponentFixture<BusinessPostHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessPostHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPostHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
