export class JobPost {
    smeUuid: string

    vacancyUuid: string

    vacancyTitle: string

    shortDescription: string

    longDescription: string

    applied: boolean

    minExp: number

    maxExp: number

    minSalary: number

    maxSalary: number

    noOfVacancy: number

    lastApplyDate: Date

    totalApplicants: number

    vacancyDetail: VacancyDetail

    smeInfo: SMEDto

    vacancyActive: boolean

    businessPost: boolean

    isSelected: boolean

    frontFeedBackMessage: string

    jobTypes: Array<string>;

    employmentTypes: Array<string>;

    skillSets: Array<string>;

    preferredShift: PreferredShift;

    locations: Array<string>;

    qualificationSpecializations: Array<SpecializationDto>;

    jobRole: IndustrialJobRoleDto;

    qualificationCourses: Array<CourseDto>;

    otherCategory: VacancyOtherCategory

    isApprove: boolean

    isReject: boolean
}
export class VacancyDetail {
    vdUuid: string

    longDescription: string

    contactMobileNumber: string

    contactEmail: string
}

export class SMEDto {
    smeName: string
    sUuid: string
}

export class UserDto {
    uuid: string
    userFullName: string

}

export class JobFilter {
    filters: Map<string, Array<any>>
}

export class JobFilterResponse extends JobFilter {
    results: Array<JobPost>;
    totalVacanciesCount: number
}


export class FilterBySme {
    sUuid: string;
    smeName: string;
    selected: string;
}
export class FilterByExperience {
    minExp: DoubleRange;
    maxExp: DoubleRange;
    formattedExperience: string
    selected: boolean;
}
export class FilterByLocation {
    location: string;
    selected: boolean;
}
export class FilterByQualification {
    qualification: string;
    selected: boolean;
}
export class FilterByJobRole {
    jobRole: string;
    selected: boolean;

}
export class FilterBySalary {
    minSalary: LongRange;
    maxSalary: LongRange;
    formattedSalary: string
    selected: boolean
}
export class FilterByRevelance {
    minCreationDate: Date;
    maxCreationDate: Date;
    selected: boolean;
}

export class JobSeeker {
    /* basic info Start*/

    userAccountId: string;

    jobSeekerProfileUuid: string

    firstName: string;

    lastName: string;

    fullName: string

    emailId: string;

    mobileNumber: number

    dob: Date

    currentOrganization: string;

    currentDesig: string;

    gender: string

    currentSalary: EmploymentSalary

    totalExperience: Experience

    jobSeekerAddress: JobSeekerAddress
    /* basic info End*/

    educationalDetail: EducationalDetail;

    experienceDetails: Array<ExperienceDetail>;

    careerProfile: CareerProfile;

    skillSets: Array<string>;

    jobSeekerResume: JobSeekerResume
}
export class JobSeekerAddress {
    currentCity: string

    currentState: string

    currentCountry: string
}
export class JobSeekerResume {
    resumeUrl: string;

    resumeFileName: string;
}
export class EmploymentSalary {
    salary: LongRange
    salaryType: DateType;
    currency: Currency
}
export class Experience {
    month: number;
    year: string;
}
enum DateType {
    DAY, MONTH, YEAR
}
enum Currency {
    INR, DOLLAR
}
export class Year {
    yearId: number;
    year: number;
}
export class SpecializationDto {

    specializationId: string;

    specializationName: string;

    course: CourseDto;
}
export class CourseDto {

    courseId: string;

    courseName: string;

    specializations: Array<SpecializationDto>

    totalSpecializations: number
}
export class CourseCategoryDto {

    courseCategoryId: string;

    courseCategoryName: string;

    courses: Array<CourseDto>
}
export class EducationalDetail {

    qualificationSpecialization: SpecializationDto

    highestQualification: string;

    universityName: string;

    instituteName: string;

    passingOutYear: string

    percentage: DoubleRange;

    qualificationCourse: CourseDto;
}
export enum PreferredShift {
    DAY, NIGHT, MID_DAY, FLEXIBLE
}
export class JobRole {
    jobRoleUuid: string;
    jobRole: string;
}

export class CareerProfile {

    jobTypes: Array<string>;

    employmentTypes: Array<string>;

    preferredShift: PreferredShift;

    expectedSalary: EmploymentSalary;

    jobRole: JobRole;

    prefferedJobLocations: Array<string>

}
export class IndustrialAreaDto {

    areaUuid: string;

    industrialAreaName: string;

    jobRoles: Array<IndustrialJobRoleDto>;


}
export class IndustrialJobRoleDto {

    jobRoleUuid: string;

    jobRole: string

    industrialArea: IndustrialAreaDto;
}
export class ExperienceDetail {

    experienceDetailUuid: string

    companyName: string;

    jobDescription: string;

    startDate: Date

    endDate: Date

    jobRole: JobRole;

    currentlyWorking: boolean;

    noticePeriod: number
}

export class JobView {

    smeInfo: SMEDto;

    vacancyUuid: string

    vacancyTitle: string

    shortDescription: string

    minExp: DoubleRange

    maxExp: DoubleRange

    minSalary: LongRange

    maxSalary: LongRange

    jobTypes: string

    employmentTypes: string

    skillSets: Array<string>

    preferredShift: PreferredShift

    locations: string

    rawFormatQualification: string

    noOfVacancy: number

    jobRole: string

    applied: boolean

    lastApplyDate: Date

    vacancyDetail: VacancyDetail

    totalApplicants: number

    vacancyActive: boolean;

    vacancyState: VacancyState;

    requiredDocuments: string
}
export class JobVO {
    vacancyVo: JobView
    applicantStatus: ApplicantStatus
    applicantUuid: string
    applyDate: Date
    shortListedInfo: ShortListedInfo


}
enum VacancyState {

    PENDING, APPROVED, REJECTED
}
export class CustomApplicant {
    fullName: string
    contactNumber: string
    emailId: string
    resumeUrl: string
}

export class JobApplicantDto {
    customApplicant: CustomApplicant
    applicant: JobSeeker
    shortListedInfo: ShortListedInfo
    applyDate: Date
    shortListed: boolean
    applicantUuid: string
    applicantStatus: ApplicantStatus
    candidateName: string
}

export enum ApplicantStatus {
    SHORTLISTED="SHORTLISTED", REJECTED="REJECTED", PENDING="PENDING",ALL="ALL"
}

export class VacancyOtherCategory {
    areaUuid: string
    customIndustrialArea: string
    customJobRoleUuid: string
}

export class JobSeekerBasicProfileInfo {
    fullName: string
    emailId: string
    mobileNumber: string
}

export class CustomJobApply {
    fullName: string;
    contactNumber: string;
    emailId: string;
    resume: string
}
export class ShortListedInfo {
    interviewDate: Date
    interviewTime: string
    description: string
}

export class VacancyApplicantInfo {

    smeUuid: string;

    fullName: string;

    emailId: string;

    mobileNumber: string;

    vacancyTitle: string;

    applyDate: Date;

    contactEmail: string;

    contactMobileNumber: string;

    applicantStatus: ApplicantStatus;

    lastModifiedDate: Date;
}