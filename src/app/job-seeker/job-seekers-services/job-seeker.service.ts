import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomHttpResponse } from '@models/custom.response';
import { JobSeekerModule } from '../job-seeker.module';
import { environment } from 'environments/environment';
import { JobVO } from '@models/jobs';

@Injectable({
  providedIn: JobSeekerModule
})
export class JobSeekerService {

  constructor(private http: HttpClient) { }

  /*Post API START*/
  public postJobSeeker(formData): Observable<any> {
    return this.http.post(environment.JOB_SEEKER, formData, { observe: 'response' })
  }
  public postExperienceDetail(formData) {
    return this.http.post<CustomHttpResponse<any>>(environment.JOB_SEEKER + 'experience-detail', formData)
  }

  public postEducationalDetails(formData) {
    return this.http.post<CustomHttpResponse<any>>(environment.JOB_SEEKER + 'educational-detail', formData)
  }

  public postCareerDesiredProfile(formData) {
    return this.http.post<CustomHttpResponse<any>>(environment.JOB_SEEKER + 'career-detail', formData)
  }

  public addKeySkillSet(formData) {
    return this.http.post<CustomHttpResponse<any>>(environment.JOB_SEEKER + 'skill-sets', formData)
  }

  public shortListed(formData) {
    return this.http.post<CustomHttpResponse<any>>(environment.JOBS_URL + 'shortlist', formData)
  }

  /*Post API END*/

  /*GET API START*/

  public getJobSeekerProfileInfo() {
    return this.http.get<CustomHttpResponse<any>>(environment.JOB_SEEKER + 'profile')
  }

  public getCourseCategoryInEducation() {
    return this.http.get<CustomHttpResponse<any>>(environment.JOB_SEEKER + 'course-categories')
  }

  public getCourseInEducation(id: string) {
    return this.http.get<CustomHttpResponse<any>>(environment.JOB_SEEKER + 'courses', { params: { courseCategoryId: id } })
  }

  public getSpecializationInEducation(idCourse: string) {
    return this.http.get<CustomHttpResponse<any>>(environment.JOBS_URL + 'specializations', { params: { courseId: idCourse } })
  }

  public getIndustrialAreas() {
    return this.http.get<CustomHttpResponse<any>>(environment.JOBS_URL + 'industrial-areas')
  }

  public getIndustrialJobRoles(industrialAreaId: string) {
    return this.http.get<CustomHttpResponse<any>>(environment.JOBS_URL + 'job-roles', { params: { industrialAreaId: industrialAreaId } })
  }

  public getcourse2() {
    return this.http.get<CustomHttpResponse<any>>(environment.JOBS_URL + 'course-categories/courses');
  }

  public getAppliedJobsByJobSeeker() {
    return this.http.get<CustomHttpResponse<Array<JobVO>>>(environment.JOB_SEEKER + 'applied/vacancies');
  }
  /*GET API END*/


  /*PUT API START*/

  public updateEducationalDetails(formData) {
    return this.http.put<CustomHttpResponse<any>>(environment.JOB_SEEKER + 'educational-detail', formData)
  }

  public updateExperienceDetail(formData) {
    return this.http.put<CustomHttpResponse<any>>(environment.JOB_SEEKER + 'experience-detail', formData)
  }

  public updateBasicProfileInfo(formData) {
    return this.http.put<CustomHttpResponse<any>>(environment.JOB_SEEKER + 'profile', formData)
  }

  public updateCareerDesiredProfile(formData) {
    return this.http.put<CustomHttpResponse<any>>(environment.JOB_SEEKER + 'career-detail', formData)
  }

  public uploadResume(formData) {
    return this.http.put<CustomHttpResponse<any>>(environment.JOB_SEEKER + '/upload-resume', formData)
  }
  /*PUT API END*/


  /*DELETE API START*/

  public deleteResume() {
    return this.http.delete<CustomHttpResponse<any>>(environment.JOB_SEEKER + '/resume')
  }
  /*DELETE API END*/
}
