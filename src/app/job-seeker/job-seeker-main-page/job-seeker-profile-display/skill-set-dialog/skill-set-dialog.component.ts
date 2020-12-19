import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JobSeekerService } from 'app/job-seeker/job-seekers-services/job-seeker.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent} from '@angular/material/chips';
import { SnackBarService } from '@services/common/snack-bar.service';
import { TokenService } from '@services/token/token.service';

@Component({
  selector: 'app-skill-set-dialog',
  templateUrl: './skill-set-dialog.component.html',
  styleUrls: ['./skill-set-dialog.component.css']
})
export class SkillSetDialogComponent implements OnInit {

  editSkillSetForm: FormGroup

  visible = true;

  selectable = true;

  removable = true;

  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  apiSkillSets: Array<string>

  newlyAddedSkillSets=new Array<string>();

  showButton: boolean = true

  uuid:string
  constructor(private formBuilder: FormBuilder, private token:TokenService,private router: Router, private snackBar: SnackBarService, private jobSeekerService: JobSeekerService, private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<SkillSetDialogComponent>) { }

  ngOnInit() {
    this.uuid=this.token.getUserId();
    this.apiSkillSets = this.data
    this.newlyAddedSkillSets.push(...this.apiSkillSets)

    this.editSkillSetForm = this.formBuilder.group({

      skillSets: this.formBuilder.array([]),

    })
  }
  onClickClose() {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.newlyAddedSkillSets.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(skill): void {
    const index = this.newlyAddedSkillSets.indexOf(skill);
    if (index >= 0) {
      this.newlyAddedSkillSets.splice(index, 1);
    }
  }
  addSkillSets() {
    this.newlyAddedSkillSets.forEach(s => {
      const control = new FormControl(true);
      (this.editSkillSetForm.controls.skillSets as FormArray).push(control);
    })
  }
  onSave() {

    this.showButton = false

    this.jobSeekerService.addKeySkillSet(this.newlyAddedSkillSets).subscribe(
      res => {
        this.dialogRef.close();
        this.snackBar.open('Skill Set Details Updated');

          this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
          this.router.navigate(['job-seeker', this.uuid, 'job-seeker-display']));
      },
      err => {
        this.showButton = true
      }
    )
  }
}
