import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeProductsComponent } from './sme-products.component';

describe('SmeProductsComponent', () => {
  let component: SmeProductsComponent;
  let fixture: ComponentFixture<SmeProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
