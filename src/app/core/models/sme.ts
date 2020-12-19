import { GloqrAdminItemsCount } from './sme-items-count';
import { Image } from './common';
import { SMEImage } from './sme-image';

export class SMEInformationDto {
    smeName: string;
    smeType: SMEType;
    uuid: string;
    registeredType: RegisteredType;
    address: string;
    companyDescription: string;
    contactEmail: string;
    contactPerson: string;
    contactPhone: string;
    gstin: number;
    smeAddress: SMEAddress
    numberOfEmployees: number;
    oneLineStatement: string;
    latitude: number;
    longitude: number;
    yearOfEstablishment: DateConstructor;
    turnOver: TurnOver;
    logoImage: string;
    googlemapLink: string;
    sUuid: string;
    companyLogo: string;
    otherCategory: SMEOtherCategory;
    homeSliderImages: Array<SMEImage>;
    acceptedTermsCondition:boolean
}
export class SMEInformationVo {
    smeName: string;
    sUuid: string;
    logoImage: string;
    smeAddress: SMEAddress;
    contactEmail: string;
    contactPerson: string;
    status: string;
    mutualConnectionCount: number
}
export class SME {
    smeName: string
    sUuid: string
}
export class SMECategoryDto {
    categoryUuid: string
    categoryUrl: string
    categoryName: string
    smes: Array<SMEInformationDto>
    totalSmesCount: number;
}
export class GloqrSMEDto extends SMEInformationDto {
    smeCategory: SMECategoryDto
    active: boolean;
    verified: boolean;
}

export class GloqrSMEVo extends SMEInformationVo {
    creationDate: Date;
    uuid: string;
    itemsCount: GloqrAdminItemsCount;
}

export class GloqrAdmin {
    totalSmes: number;
    smes: Array<GloqrSMEVo>;
}


export class SMEApproveSendResponse {
    categoryUuid: string
    sUuid: string

}

export class SMEOtherCategory {
    categoryUuid: string
    otherCategoryName: string
}
export class SMEAddress {
    addrsUuid: string;

    street: string;

    city: string;

    country: string;

    state: string;

    pincode: number;

    locality: string;
}

export class SearchRequest {
    searchText: string
}

export class City {
    state: State
    cityCode: string
    cityName: string
    formattedCityName: string
}
export class State {
    country: Country
    formattedStateName: string
    stateCode: string
    stateName: string

}
export class Country {
    countryCode: string
    countryName: string
}

export class TurnOver {
    totalTurnOver: DoubleRange;

    turnOverUnit: TurnOverUnit;
}

export enum TurnOverUnit {
    CRORES, LAKHS
}

export enum SMEType {
    TRADER, MANUFACTURE, PROVIDER
}

export enum RegisteredType {
    PUBLIC, PRIVATE, PROPRIETORSHIP, PARTNERSHIP, OTHER
}

export enum ItemState {
    PENDING,
    APPROVED,
    REJECTED
}

export enum SMEItemStatus {
    ACTIVE,
    DEACTIVE
}

export class SmeEntity {
    id: string;
    state: ItemState;
    feedbackMessage: string;
    smeAction: SMEItemStatus
    subCategoryUuid: string
    jobRoleUuid: string
    categoryUuid: string
    editedImages: Array<Image>
    images: Array<SMEImage>
}

export enum SMEItemsType {
    CERTIFICATE = "CERTIFICATE", INFRASTRUCTURE = "INFRASTRUCTURE", GALLERY = "GALLERY", TEAM = "TEAM"
}

/*Filter Response*/
export class SMEFilterDto {
    filters: Map<string, Array<any>>;
}

export class SMEFilterResponse extends SMEFilterDto {
    result: Array<SMEInformationVo>;
    totalSmesCount: number
}

export class SMEFilterByCity {
    city: string;
    totalSmesCount: number;
    selected: boolean;
}

export class SMECategoryFilter {
    categoryName: string;
    totalSmesCount: number;
    selected: boolean;
}

export class SMEConstant {
    public static COMPANY_LOGO: string = "logoImage";
    public static SLIDER_IMAGES: string = "sliderImages";
    public static CERTIFICATES: string = "certificates";
    public static INFRASTRUCTURES: string = "infrastructures";
    public static GALLERIES: string = "galleries";
    public static TEAMS: string = "teams";
}
export class PieChartValue {
    totalAmount: number;
    quotationAmount: number;
    deliveredAmount: number;
    totalCount: number = 0;
    quotationCount: number;
    deliveredCount: number;
}
export class BarChartValue {
    total: number[];
    quotation: number[];
    delivered: number[];
    months: string[];
}
export class VacancyApplicantCountVo
{
     vacancyTitle:string;
     vacancyUuid:string;
     vacancyUrl:FunctionStringCallback;
     totalApplicant:DoubleRange;
     shortListedApplicant:DoubleRange;
     rejectedApplicant:DoubleRange;
     pendingApplicant:DoubleRange;
     vacancyActive:boolean
     vacancyState:ItemState
}
