import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceImagesComponent } from './service-images.component';

describe('ServiceImagesComponent', () => {
  let component: ServiceImagesComponent;
  let fixture: ComponentFixture<ServiceImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
