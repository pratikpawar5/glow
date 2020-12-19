import { Component, OnInit, Inject } from '@angular/core';
import { SMECircleDto, CountAndData } from '@models/business-circle';
import { environment } from 'environments/environment';
import { SocialService } from 'app/social/social-service/social.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-private-connection-dialog-box',
  templateUrl: './private-connection-dialog-box.component.html',
  styleUrls: ['./private-connection-dialog-box.component.css']
})
export class PrivateConnectionDialogBoxComponent implements OnInit {

  connectionIds: string[] = []
  connectionIdsUpdate: string[] = []
  countAndData: CountAndData
  contentServer: string = environment.CONTENT_SERVER
  selectedAll: boolean
  constructor(private dialogRef: MatDialogRef<PrivateConnectionDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private socialService: SocialService) { }

  ngOnInit() {
    this.connectionIdsUpdate = this.data
    if (this.connectionIdsUpdate != null) {
      this.connectionIds.push(...this.connectionIdsUpdate)
    }
    this.socialService.getMyCircleConnection().subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.countAndData = res.data
          if (this.connectionIdsUpdate != null) {
            if (this.connectionIdsUpdate.length === this.countAndData.data.length) {
              this.selectedAll = true
            }
            else {
              this.selectedAll = false
            }
          }
        }
      }
    )
  }

  selectAll(e) {
    if (e.target.checked) {
      for (let i = 0; i < this.countAndData.data.length; i++) {
        let index = this.connectionIds.indexOf(this.countAndData.data[i].sUuid)
        if (index === -1) {
          this.connectionIds.push(this.countAndData.data[i].sUuid)
          this.selectedAll = true
        }
      }
    }
    else {
      this.connectionIds = []
      this.selectedAll = false
    }
  }

  onClickButton(sUuid: string) {

    let index = this.connectionIds.indexOf(sUuid)

    if (index === -1) {
      this.connectionIds.push(sUuid)
      if (this.connectionIds.length === this.countAndData.data.length) {
        this.selectedAll = true
      }

    } else {
      for (let i = 0; i < this.connectionIds.length; i++) {
        if (this.connectionIds[i] === sUuid) {
          this.connectionIds.splice(i, 1)
          this.selectedAll = false
        }
      }
    }
  }

  onSave() {
    this.dialogRef.close(this.connectionIds)
  }

  close() {
    this.dialogRef.close(this.connectionIdsUpdate)
  }

}
