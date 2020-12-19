import { PlanName, PricingPlan, CreditType } from './pricing';

export class PaymentRequest {
    userUUID: string
    sUuid: string
    creditType: string
    credits: number
    paymentUtility: PaymentUtility
    planName: PlanName
}
export class OfflinePayment {

    bankName: string
    branchName: string
    transactionDate: Date
    transactionNumber: string
    amount: number
    paymentMode: string
    planName: PlanName
    paymentUtility: PaymentUtility
    message: string
    planCost: number
    userUUID: number
}
export class CreatePayment {
    key: string
    amount: number
    name: string
    prefill: Prefill
    handler: any
    order_id: string
    orderID: string
}
export interface Prefill {
    contact: number
    name: string
    email: string
}
export class CapturePayment {
    razorpayOrderID: string
    razorpayPaymentID: string
    razorpaySignature: string
}
export enum PaymentUtility {
    UPGRADE_PACKAGE = "UPGRADE_PACKAGE",
    NEW_PACKAGE = "NEW_PACKAGE",
    BUSINESS_CREDITS = "BUSINESS_CREDITS",
}

export interface PlanCosting {
    planCost: number
    gstAmount: number
    gst: number
    totalPayableAmount: number
    planName: PlanName
    planDisplayName: string
    accountName: string
    accountNumber: number
    bankName: string
    bankIFSCCode: string
    pricingPlan: PricingPlan
}
export interface CreditsResponse {
    credits: number
    creditType: CreditType
    displayName: string
}

export class VerifiedPayment{
      offlinePaymentUuid:string;
      sUuid:string;
      verified:boolean;
      rejectReason:string
}