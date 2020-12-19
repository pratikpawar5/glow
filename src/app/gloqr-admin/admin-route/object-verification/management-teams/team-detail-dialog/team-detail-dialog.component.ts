import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ItemState, SmeEntity } from '@models/sme';
import { Image } from '@models/common';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-team-detail-dialog',
  templateUrl: './team-detail-dialog.component.html',
  styleUrls: ['./team-detail-dialog.component.css']
})
export class TeamDetailDialogComponent implements OnInit {

  name: string;
  smeEntities = new Array<SmeEntity>();
  showImages: boolean
  images: Image[] = []
  public itemStatus: ItemState;
  certificateForm: FormGroup;
  feedbackMessage = new FormControl();
  contentServer: string = environment.CONTENT_SERVER
  smeEntity: SmeEntity;
  constructor(private dialogRef: MatDialogRef<TeamDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onApprove() {
    this.smeEntity = new SmeEntity();
    this.smeEntity.id = this.data.teamUuid
    this.smeEntity.feedbackMessage = this.feedbackMessage.value
    this.smeEntity.state = ItemState.APPROVED;
    this.dialogRef.close(this.smeEntity)
  }
  onReject() {
    this.smeEntity = new SmeEntity();
    this.smeEntity.id = this.data.teamUuid
    this.smeEntity.feedbackMessage = this.feedbackMessage.value
    this.smeEntity.state = ItemState.REJECTED;
    this.dialogRef.close(this.smeEntity)
  }
  close() {
    this.dialogRef.close(this.smeEntity)
  }
}
