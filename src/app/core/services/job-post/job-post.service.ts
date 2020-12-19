import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomHttpResponse } from '@models/custom.response';
import { JobPost, JobApplicantDto, JobFilterResponse, JobView } from '@models/jobs';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { TokenService } from '@services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class JobPostService {

  constructor(private http: HttpClient, private token: TokenService, private dialog: DialogService) { }

  public uploadApplicantForm(sUuid: string, vacancyUuid: string, uploadFormData): Observable<any> {

    return this.http.post(environment.JOBS_URL + ' ' + '/apply/' + sUuid + '/sme/' + vacancyUuid + '/vacancy', uploadFormData)
  }
  public postJobSeeker(formData): Observable<any> {
    return this.http.post(environment.JOBS_URL, formData, { observe: 'response' })
  }
  public postExperienceDetail(formData) {
    return this.http.post<CustomHttpResponse<any>>(environment.JOBS_URL + 'experience-detail', formData)
  }


  public postEducationalDetails(formData) {
    return this.http.post<CustomHttpResponse<any>>(environment.JOBS_URL + 'educational-detail', formData)
  }

  public postCareerDesiredProfile(formData) {
    return this.http.post<CustomHttpResponse<any>>(environment.JOBS_URL + 'career-detail', formData)
  }

  public addKeySkillSet(formData) {
    return this.http.post<CustomHttpResponse<any>>(environment.JOBS_URL + 'skill-sets', formData)
  }

  /*Post API END*/


  /*GET API START*/
  public getJobsBySmeId(pendingJobs: string) {
    if (pendingJobs != null || pendingJobs != undefined) {
      return this.http.get<CustomHttpResponse<Array<JobView>>>(environment.JOBS_URL + 'sme-vacancies', { params: { pendingVacancies: pendingJobs } })
    }
    else {
      return this.http.get<CustomHttpResponse<Array<JobView>>>(environment.JOBS_URL + 'sme-vacancies')
    }
  }

  public getJobByJobUuidforViewMode(jobUuid: string) {
    return this.http.get<CustomHttpResponse<any>>(environment.JOBS_URL + 'view/sme/' + jobUuid + '/vacancy')
  }

  public getJobsByUuidTypeUSER(jobUuid: string, userUUID: string) {
    return this.http.get<CustomHttpResponse<any>>(environment.JOBS_URL + 'view/sme/' + jobUuid + '/vacancy', { params: { u: userUUID } })
  }

  public getJobByJobUuidforEditMode(jobUuid: string) {
    return this.http.get<CustomHttpResponse<JobPost>>(environment.JOBS_URL + jobUuid + '/vacancy')
  }

  public getFilteredJobsWithPagination(jobRoleFilterParams, jobLocationFilterParams, jobExperienceFilterParams, salaryFilterParams, smeFilterParams, page) {
    return this.http.get<CustomHttpResponse<JobFilterResponse>>(environment.JOBS_URL + 'jobs', {
      params: {
        filterByJobRoles: jobRoleFilterParams,
        filterByLocations: jobLocationFilterParams,
        filterByExperiences: jobExperienceFilterParams,
        filterBySalaries: salaryFilterParams,
        filterBySmes: smeFilterParams,
        page: page
      }
    })

  }

  public getAllJobs(url: string) {
    return this.http.get<CustomHttpResponse<JobFilterResponse>>(environment.SEARCH_URL + url)

  }

  public getVacancyTypes(): Observable<any> {
    return this.http.get(environment.JOBS_URL + "types");
  }

  public getAppliedPeople(vacancyUuid: string): Observable<any> {
    return this.http.get(environment.JOBS_URL + 'loginsmeid' + '/sme/' + vacancyUuid + '/vacancy/job-applicant')
  }

  public getJobFilter(): Observable<any> {
    return this.http.get(environment.JOBS_URL + 'filter')
  }

  public getJobSeekerProfileInfo() {
    return this.http.get<CustomHttpResponse<any>>(environment.JOBS_URL + 'job-seeker/profile-info')
  }

  public getCourseCategoryInEducation() {
    return this.http.get<CustomHttpResponse<any>>(environment.JOBS_URL + 'course-categories')
  }

  public getCourseInEducation(id: string) {
    return this.http.get<CustomHttpResponse<any>>(environment.JOBS_URL + 'courses', { params: { courseCategoryId: id } })
  }

  public getSpecializationInEducation(idCourse: string) {
    return this.http.get<CustomHttpResponse<any>>(environment.JOBS_URL + 'specializations', { params: { courseId: idCourse } })
  }

  public getJobsBySmeIdViewMode(sUuid: string) {
    return this.http.get<CustomHttpResponse<Array<JobView>>>(environment.JOBS_URL + 'view/' + sUuid + '/sme')
  }

  public getIndustrialAreas() {
    return this.http.get<CustomHttpResponse<any>>(environment.JOBS_URL + 'industrial-areas')
  }

  public getIndustrialJobRoles(industrialAreaId: string) {
    return this.http.get<CustomHttpResponse<any>>(environment.JOBS_URL + 'job-roles', { params: { industrialAreaId: industrialAreaId } })
  }

  public getcourse2() {
    return this.http.get<CustomHttpResponse<any>>(environment.JOBS_URL + 'course-categories/courses')
  }
  /*GET API END*/

  /*PUT API START*/


  public updateEducationalDetails(formData) {
    return this.http.put<CustomHttpResponse<any>>(environment.JOBS_URL + 'educational-detail', formData)
  }

  public updateExperienceDetail(formData) {
    return this.http.put<CustomHttpResponse<any>>(environment.JOBS_URL + 'experience-detail', formData)
  }

  public updateBasicProfileInfo(formData) {
    return this.http.put<CustomHttpResponse<any>>(environment.JOBS_URL + 'job-seeker/profile-info', formData)
  }

  public updateCareerDesiredProfile(formData) {
    return this.http.put<CustomHttpResponse<any>>(environment.JOBS_URL + 'career-detail', formData)
  }

  public uploadResume(formData) {
    return this.http.put<CustomHttpResponse<any>>(environment.JOBS_URL + 'job-seeker/upload-resume', formData)
  }
  /*PUT API END*/


  /*DELETE API START*/

  public deleteResume(uuid: string) {
    return this.http.delete<CustomHttpResponse<any>>(environment.JOBS_URL + uuid + '')
  }
  /*DELETE API END*/


  /*Apply Functionality*/

  // public appliedJob(vacancyUuid: string) {
  //   if (this.token.isLoggedIn()) {
  //     this.applyJob(vacancyUuid);
  //   }
  //   else {
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

  public applyJob(vacancyUuid: string) {
    return this.http.post<CustomHttpResponse<any>>(environment.JOBS_URL + vacancyUuid + '/apply', {});
  }

  public getJobApplicants(vacancyUuid: string, applicantStatus: string) {
    if (applicantStatus) {

      return this.http.get<CustomHttpResponse<Array<JobApplicantDto>>>(environment.JOBS_URL + vacancyUuid + '/applicants', { params: { applicantStatus: applicantStatus } });
    }
    else {
      return this.http.get<CustomHttpResponse<Array<JobApplicantDto>>>(environment.JOBS_URL + vacancyUuid + '/applicants');
    }
  }


  /*Custom Apply*/

  public customApplyJob(vacancyUuid: string, formData) {
    return this.http.post<CustomHttpResponse<any>>(environment.JOBS_URL + vacancyUuid + '/custom-apply', formData)
  }


  /*Get Single JobSeeker Profile*/

  public getSingleJobApplicantProfile(applicantUuid: string) {
    return this.http.get<CustomHttpResponse<any>>(environment.JOBS_URL + applicantUuid + '/applicant');

  }
}
