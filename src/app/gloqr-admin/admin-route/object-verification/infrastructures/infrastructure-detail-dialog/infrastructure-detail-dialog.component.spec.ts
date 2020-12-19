import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructureDetailDialogComponent } from './infrastructure-detail-dialog.component';

describe('InfrastructureDetailDialogComponent', () => {
  let component: InfrastructureDetailDialogComponent;
  let fixture: ComponentFixture<InfrastructureDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfrastructureDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfrastructureDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
