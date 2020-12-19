export enum PageName {
    LOGIN,
    SIGNUP,
    OTP,
    FORGOT_PASSWORD,
}

export interface PageData {
    pageName: PageName
}

export interface Image {
    fileLocation: string
    fileLocationOne: string
    fileLocationTwo: string
    mainImage: boolean
    size: number
}

export enum State {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    DELETED = "DELETED"
}

export interface QuotationFormat {
    name: string
    value: string
    url: string
}

export interface GST {
    name: string
    value: number
}

export class SearchHistory {
    type: SearchCategory
    data: any
}

export enum SearchCategory {
    PRODUCT = "PRODUCT",
    SERVICE = "SERVICE",
    SME = "SME",
    ALL = "ALL"
}

export class SortParamFilter {
   public static POPULARITY_SORT:string = "popularity";
   public static ASC_SORT:string = "asc";
   public static DESC_SORT:string = "desc";
}



