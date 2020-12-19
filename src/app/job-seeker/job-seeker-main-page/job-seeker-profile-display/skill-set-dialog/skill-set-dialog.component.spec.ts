import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillSetDialogComponent } from './skill-set-dialog.component';

describe('SkillSetDialogComponent', () => {
  let component: SkillSetDialogComponent;
  let fixture: ComponentFixture<SkillSetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillSetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillSetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
