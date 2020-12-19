import { Component, OnInit } from '@angular/core';
import { JobSeekerBasicDetailsDialogComponent } from './job-seeker-basic-details-dialog/job-seeker-basic-details-dialog.component';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ExperienceDetail, EducationalDetail, CareerProfile, JobSeekerResume, JobSeeker } from '@models/jobs';
import { CreateEducationalDetailsDialogComponent } from './educational/create-educational-details-dialog/create-educational-details-dialog.component';
import { UpdateEducationalDetailsDialogComponent } from './educational/update-educational-details-dialog/update-educational-details-dialog.component';
import { SkillSetDialogComponent } from './skill-set-dialog/skill-set-dialog.component';
import { CreateExperienceDetailsDialogComponent } from './experience/create-experience-details-dialog/create-experience-details-dialog.component';
import { UpdateExperienceDetailsDialogComponent } from './experience/update-experience-details-dialog/update-experience-details-dialog.component';
import { CreateCareerDesiredDialogComponent } from './career-desired-profile/create-career-desired-dialog/create-career-desired-dialog.component';
import { UpdateCareerDesiredDialogComponent } from './career-desired-profile/update-career-desired-dialog/update-career-desired-dialog.component';
import { environment } from 'environments/environment';
import { DeleteObject, JobSeekerResumeDelete, ObjectType } from '@models/common-delete';
import { HttpClient } from '@angular/common/http';
import { PageTitleService } from '@services/page-title/page-title.service';
import { TokenService } from '@services/token/token.service';
import { JobSeekerService } from '../../job-seekers-services/job-seeker.service';
import { Router, RoutesRecognized } from '@angular/router';
import { SnackBarService } from '@services/common/snack-bar.service';
import { ConstantService } from '@services/common/constant-service.service';
import { DeleteObjectsComponent } from 'app/shared/components/delete-objects/delete-objects.component';
import { DialogService } from '@services/mat-dialog/dialog.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';
declare var ga: Function;
@Component({
  selector: 'app-job-seeker-profile-display',
  templateUrl: './job-seeker-profile-display.component.html',
  styleUrls: ['./job-seeker-profile-display.component.css']
})

//Display Job Seeker Profile Display it includes basic job seeker profile,educational details, experince , skill set dialog, career desired profile

export class JobSeekerProfileDisplayComponent implements OnInit {

  jobSeeker: JobSeeker
  experienceDetail: Array<ExperienceDetail>
  educationDetail: EducationalDetail
  careerProfile: CareerProfile
  jobSeekerResume: JobSeekerResume
  skillSets: Array<string>

  /* Dialog Box Conf*/
  jobSeekerBasicDetailsDialogDialogRef: MatDialogRef<JobSeekerBasicDetailsDialogComponent>;

  educationalCreateDialogRef: MatDialogRef<CreateEducationalDetailsDialogComponent>;
  educationalUpdateDialogRef: MatDialogRef<UpdateEducationalDetailsDialogComponent>;

  experinceCreateDialogRef: MatDialogRef<CreateExperienceDetailsDialogComponent>;
  experinceEditDialogRef: MatDialogRef<UpdateExperienceDetailsDialogComponent>;

  careerDesiredCreateProfileDialogRef: MatDialogRef<CreateCareerDesiredDialogComponent>;
  careerDesiredUpateProfileDialogRef: MatDialogRef<UpdateCareerDesiredDialogComponent>;

  skillSetEditDialogRef: MatDialogRef<SkillSetDialogComponent>;

  /* File  Upload Resume*/

  fileUploadFail: boolean

  allowedFileSize: number

  resumeFileTypes: Array<string>

  fileSizeError: boolean

  resumeFileTypeError: boolean

  contentServer: string = environment.CONTENT_SERVER

  userProfileImage: string

  smefaceImage: boolean = true

  /*new obj for file*/

  file: File

  selectedFile: File

  uploadedFile: JobSeeker

  resumeName: string

  showUploadButton: boolean = true

  uuid: string
  constructor(private http: HttpClient, private titleService: PageTitleService, private matDialog: MatDialog, private constantService: ConstantService,
    private snackBar: SnackBarService, private dialog: DialogService, private router: Router, private token: TokenService, private jobSeekerService: JobSeekerService) {
    this.resumeFileTypes = constantService.getResumeFormats();
    this.allowedFileSize = constantService.getMaxResumeSize();
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {

    this.router.events
      .filter(e => e instanceof RoutesRecognized)
      .pairwise()
      .subscribe((event: any) => {
      });


    this.titleService.updateTitle('Job Seeker Profile');

    this.userProfileImage = this.token.getProfileImage();
    this.uuid = this.token.getUserId();
    this.jobSeekerService.getJobSeekerProfileInfo().subscribe(
      res => {
        if (res.error) {
          this.router.navigateByUrl('/pages/job-seeker-permission')
        }
        else {
          this.jobSeeker = res.data
          this.experienceDetail = res.data.experienceDetails
          this.educationDetail = res.data.educationalDetail
          this.careerProfile = res.data.careerProfile
          this.jobSeekerResume = res.data.resume
          this.skillSets = res.data.skillSets
        }
      }
    )
  }
  checkImage(imageUrl: string) {

    if (imageUrl != null && imageUrl.startsWith("https://")) {
      this.smefaceImage = false
    }

    return this.smefaceImage
  }
  deleteResume(jobSeekerResume: JobSeekerResume) {
    let removeResume = new JobSeekerResumeDelete();
    removeResume.resumeFileName = jobSeekerResume.resumeFileName
    let deleteObj: DeleteObject<any> = {
      type: ObjectType.REMOVE_JOB_SEEKER_RESUME,
      uuid: null,
      cirlceObjects: removeResume
    }

    let ref = this.matDialog.open(DeleteObjectsComponent, this.dialog.getDeleteDialogConfig(deleteObj))
  }
  onClickEditProfile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true
    dialogConfig.width = '700px';
    dialogConfig.height = '1300px'
    dialogConfig.data = this.jobSeeker
    this.jobSeekerBasicDetailsDialogDialogRef = this.matDialog.open(JobSeekerBasicDetailsDialogComponent, dialogConfig);
  }

  onClickEditEducationalDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true
    dialogConfig.width = '500px';
    dialogConfig.height = '600px'
    dialogConfig.data = this.jobSeeker.educationalDetail
    this.educationalUpdateDialogRef = this.matDialog.open(UpdateEducationalDetailsDialogComponent, dialogConfig);
  }

  onClickCreateEducationalDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true
    dialogConfig.width = '500px';
    dialogConfig.height = '600px';
    this.educationalCreateDialogRef = this.matDialog.open(CreateEducationalDetailsDialogComponent, dialogConfig);
  }

  onClickEditExperienceDialog(index) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true
    dialogConfig.width = '600px';
    dialogConfig.height = '700px';
    dialogConfig.data = this.jobSeeker.experienceDetails[index]
    this.experinceEditDialogRef = this.matDialog.open(UpdateExperienceDetailsDialogComponent, dialogConfig);
  }
  onClickCreateExperienceDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true
    dialogConfig.width = '600px';
    dialogConfig.height = '700px';
    this.experinceCreateDialogRef = this.matDialog.open(CreateExperienceDetailsDialogComponent, dialogConfig);
  }

  onClickCreateCareerDesiredProfile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = false;
    dialogConfig.width = '600px';
    dialogConfig.height = '700px';
    this.careerDesiredCreateProfileDialogRef = this.matDialog.open(CreateCareerDesiredDialogComponent, dialogConfig);
  }

  onClickCareerDesiredProfile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true
    dialogConfig.width = '600px';
    dialogConfig.height = '700px';
    dialogConfig.data = this.jobSeeker.careerProfile
    this.careerDesiredUpateProfileDialogRef = this.matDialog.open(UpdateCareerDesiredDialogComponent, dialogConfig);
  }

  onClickSkillSetEditDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true
    dialogConfig.width = '600px';
    dialogConfig.height = '400px';
    dialogConfig.data = this.jobSeeker.skillSets
    this.skillSetEditDialogRef = this.matDialog.open(SkillSetDialogComponent, dialogConfig);
  }

  /*File Upload Process*/
  onFileChanged(e: any) {
    this.fileSizeError = false
    this.resumeFileTypeError = false

    this.file = e.target.files[0]

    if (this.resumeFileTypes.indexOf(this.file.type) === -1) {
      this.resumeFileTypeError = true
      return false
    }
    else if (this.file.size > this.allowedFileSize) {
      this.fileSizeError = true
      return false
    }

    if (this.file) {
      this.uploadResumeToServer(this.file);
    }
  }

  uploadResumeToServer(resume: File) {
    let jobSeeker = environment.JOB_SEEKER
    let formData = new FormData()
    formData.append('resume', resume)

    this.http.put(jobSeeker + 'upload-resume', formData, {
    }).subscribe(
      event => {
        this.snackBar.open('Resume Uploaded Successfully');
        this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
          this.router.navigate(['job-seeker', this.uuid, 'job-seeker-display']));
      },
      err => {
        this.fileUploadFail = true
      },
    )
  }

}
