import { Injectable } from '@angular/core';
import { JobPostService } from '@services/job-post/job-post.service';
import { TokenService } from '@services/token/token.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { JobPost } from '@models/jobs';

@Injectable({
  providedIn: 'root'
})
export class JobAppiledService {
  constructor(private snackBar: SnackBarService, private token: TokenService,
    private dialog: DialogService, private jobPostService: JobPostService) { }

  // public jobApplied(vacancyUuid: string) {
  //   if (this.token.isLoggedIn()) {
  //     this.applyJob(vacancyUuid);
  //   } else {
  //     let ref = this.dialog.openLoginWindow()
  //     ref.afterClosed().subscribe(
  //       res => {
  //         if (res) {
  //           this.applyJob(vacancyUuid);
  //         }
  //       }
  //     )
  //   }
  // }

  private applyJob(vacancyUuid: string) {
    this.jobPostService.applyJob(vacancyUuid).subscribe(
      res => {
        if (res.error) {
          this.snackBar.open("Please fill your Profile First")
        }
        else {
          this.snackBar.open("Applied Successfully");
        }
      }
    )
  }
}
