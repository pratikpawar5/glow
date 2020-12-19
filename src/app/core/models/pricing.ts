
export class PricingComponents {
    listings: number
    connections: number
    biReadCredits: number
    imageStorageSize: number
    jobPostings: number
    businessPosts: number
}

export class UserPricing extends PricingComponents {
    planName: PlanName
    planDisplayName: string
    expirationDate: Date
    monthlyCreditDate: Date
    monthlyCredit: number
    userUUID: string
    sUuid: string
    initialPricing: PricingComponents
    unitCost: UnitCosting
}

export enum PlanName {
    FREE_BUSINESS = "FREE_BUSINESS",
    SMALL_BUSINESS = "SMALL_BUSINESS",
    MEDIUM_BUSINESS = "MEDIUM_BUSINESS",
    BIG_BUSINESS = "BIG_BUSINESS"
}

export enum CreditType {
    PRODUCT_SERVICE_LISTING = "PRODUCT_SERVICE_LISTING",
    CIRCLE_CONNECTION = "CIRCLE_CONNECTION",
    BUSINESS_INTEREST_VIEW = "BUSINESS_INTEREST_VIEW",
    JOB_POSTING = "JOB_POSTING",
    BUSINESS_POST = "BUSINESS_POST",
    IMAGE_STORAGE = "IMAGE_STORAGE"
}
export enum CreditErrorCode {
    PRODUCT_SERVICE_LISTING = 100,
    CIRCLE_CONNECTION = 101,
    BUSINESS_INTEREST_VIEW = 102,
    JOB_POSTING = 103,
    BUSINESS_POST = 104,
    IMAGE_STORAGE = 105
}

export interface UnitCosting {
    listingCost: number
    connectionCost: number
    biReadCost: number
    storageCost: number
    jobPostCost: number
    businessPostCost: number
}

export interface CreditsCosting {
    credits: number
    unitCost: number
    basePrice: number
    totalPrice: number
    addedGST: number
    creditType: CreditType
    typeDisplayName: string
}

export class PricingPlan extends PricingComponents {
    planName: PlanName
    planUuid: string
    planCost: number
    discountedCost: number
}

export interface PricingTable {
    offer: boolean
    offerStartDate: Date
    offerEndDate: Date
    free_business: PricingPlan
    small_business: PricingPlan
    medium_business: PricingPlan
    big_business: PricingPlan
}

export interface SelectedCreditType {
    creditType: CreditType
    displayName: string
}

export class PricingHistory {
    userUUID: string;
    previousCredits: number;
    currentCredits: number;
    credit: number;
    debit: number;
    type: string;
    source: string;
    usedFor: string;
    createdAt: Date;
}