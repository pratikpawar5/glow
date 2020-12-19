import { Component, OnInit, Inject } from '@angular/core';
import { ObjectType, DeleteObject } from '@models/common-delete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '@services/user/user.service';
import { Router } from '@angular/router';
import { TokenService } from '@services/token/token.service';
import { BusinessPostService } from '@services/business-post/business-post.service';
import { ExtraService } from '@services/common/extra.service';
import { SnackBarService } from '@services/common/snack-bar.service';

@Component({
  selector: 'app-delete-objects',
  templateUrl: './delete-objects.component.html',
  styleUrls: ['./delete-objects.component.css']
})
export class DeleteObjectsComponent implements OnInit {

  showButton: boolean = true
  uuid: string
  constructor(private dialogRef: MatDialogRef<DeleteObjectsComponent>, private extraService: ExtraService, private businessPostService: BusinessPostService, private token: TokenService, private router: Router, private userService: UserService, private snackBar: SnackBarService, @Inject(MAT_DIALOG_DATA) public data: DeleteObject<any>) {
  }

  ngOnInit() {
    this.uuid = this.token.getUserId();
  }
  onDelete() {
    this.showButton = false
    switch (this.data.type) {

      case ObjectType.CERTIFICATE:
        this.extraService.deleteCertificate(this.data.cirlceObjects.crtiUuid).subscribe(
          res => {
            if (res.error) {
              this.showButton = true
            }
            else {
              this.snackBar.open('Removed Successfully')
              this.dialogRef.close(true)
            }

          },
        )
        break;
      case ObjectType.INFRASTRUCTURE:
        this.extraService.deleteInfrastructure(this.data.cirlceObjects.infraUuid).subscribe(
          res => {
            if (res.error) {
              this.showButton = true
            }
            else {
              this.snackBar.open('Removed Successfully')
              this.dialogRef.close(true)
            }
          },
        )
        break;

      case ObjectType.GALLERY:
        this.extraService.deleteGallery(this.data.cirlceObjects.galleryUuid).subscribe(
          res => {
            if (res.error) {
              this.showButton = true
            }
            else {
              this.snackBar.open('Removed Successfully')
              this.dialogRef.close(true)
            }
          },
        )
        break;

      case ObjectType.TEAM:
        this.extraService.deleteTeam(this.data.cirlceObjects.teamUuid).subscribe(
          res => {
            if (res.error) {
              this.showButton = true
            }
            else {
              this.snackBar.open('Removed Successfully')
              this.dialogRef.close(true)
            }
          },
        )
        break;

      case ObjectType.PRODUCT:
        this.extraService.removeProduct(this.data.cirlceObjects.uuid).subscribe(
          res => {
            if (res.error) {
              this.showButton = true
            }
            else {
              this.snackBar.open('Removed Successfully')
              this.dialogRef.close(true)
            }
          },
        )
        break;

      case ObjectType.SERVICE:
        this.extraService.removeService(this.data.cirlceObjects.serviceUUID).subscribe(
          res => {
            if (res.error) {
              this.showButton = true
            }
            else {
              this.snackBar.open('Removed Successfully')
              this.dialogRef.close(true)
            }

          },
        )
        break;

      case ObjectType.BUSINESS_POST_ID:
        this.businessPostService.deleteFeed(this.data.cirlceObjects.businessPostId).subscribe(
          res => {
            if (res.error) {
              this.showButton = true
            }
            else {
              this.snackBar.open('Removed Successfully')
              this.dialogRef.close(true)
            }
          },
        )
        break;

      case ObjectType.DELETE_CONNECTION:
        this.extraService.removeConnection(this.data.cirlceObjects).subscribe(
          res => {
            if (res.error) {
              this.showButton = true
            }
            else {
              this.snackBar.open('Removed Successfully')
              this.dialogRef.close(true)
            }
          },
        )
        break;

      case ObjectType.DELETE_SENT_REQUEST:
        this.extraService.cancelRequest(this.data.cirlceObjects).subscribe(
          res => {
            if (res.error) {
              this.showButton = true
            }
            else {
              this.snackBar.open('Removed Successfully')
              this.dialogRef.close(true)
            }
          },
        )
        break;

      case ObjectType.DELETE_PENDING_REQUEST:
        this.extraService.deniedConnection(this.data.cirlceObjects).subscribe(
          res => {
            if (res.error) {
              this.showButton = true
            }
            else {
              this.snackBar.open('Removed Successfully')
              this.dialogRef.close(true)
            }
          },
        )
        break;

      case ObjectType.REMOVE_USER_PROFILE_IMAGE:
        this.userService.removeProfileImage().subscribe(
          res => {
            this.token.setToken(res.data.token)

            this.snackBar.open('Removed Successfully');

            this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
              this.router.navigate(['account', this.uuid]));

            this.dialogRef.close(true);
          },
          err => {
            this.showButton = true

          }
        )
        break;

      case ObjectType.REMOVE_JOB_SEEKER_RESUME:
        this.extraService.deleteResume().subscribe(
          res => {
            if (res.error) {
              this.showButton = true
            }
            else {
              this.dialogRef.close(true);
              this.snackBar.open('Resume Deleted Successfully');
              this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
                this.router.navigate(['job-seeker', this.uuid, 'job-seeker-display']));
            }
          },
        )
        break;

      case ObjectType.REJECTED_CANDIDATE:
        this.extraService.rejectedCandidate(this.data.cirlceObjects).subscribe(
          res => {
            if (res.error) {
              this.showButton = true
            }
            else {
              this.dialogRef.close(true);
              this.snackBar.open("Rejected Successfully");
              this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
                this.router.navigate(['job-seeker', this.uuid, 'j', this.data.cirlceObjects.applicantUuid]));
            }
          },
        )
        break;
    }
  }

  onClickNo() {
    this.dialogRef.close()
  }
}
