import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateConnectionDialogBoxComponent } from './private-connection-dialog-box.component';

describe('PrivateConnectionDialogBoxComponent', () => {
  let component: PrivateConnectionDialogBoxComponent;
  let fixture: ComponentFixture<PrivateConnectionDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateConnectionDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateConnectionDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
