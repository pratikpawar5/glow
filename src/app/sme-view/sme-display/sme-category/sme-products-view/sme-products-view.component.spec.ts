import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeProductsViewComponent } from './sme-products-view.component';

describe('SmeProductsViewComponent', () => {
  let component: SmeProductsViewComponent;
  let fixture: ComponentFixture<SmeProductsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeProductsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeProductsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
