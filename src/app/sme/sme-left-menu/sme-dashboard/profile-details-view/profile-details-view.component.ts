import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditModeItemsPercentage } from '@models/sme-items-count';

@Component({
  selector: 'app-profile-details-view',
  templateUrl: './profile-details-view.component.html',
  styleUrls: ['./profile-details-view.component.css']
})
export class ProfileDetailsViewComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ProfileDetailsViewComponent>, @Inject(MAT_DIALOG_DATA) public editModeItemsPercentage: EditModeItemsPercentage) { }
  ngOnInit() {
  }
  onClickClose() {
    this.dialogRef.close();
  }
}
