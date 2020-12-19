import { User } from "./user";

export interface Cart{
    sentItems:Array<CartItem>
    receivedItems:Array<CartItem>
    sentCount:number
    receivedCount:number
    cartFilterCount:CartFilterCount
}

export class CartItem {
    orderId:string
    cartUuid:string
    userUuid:string
    sUuid:string
    viewStatus:boolean
    cartState:CartState
    itemData:ItemData
    firstStage:FirstStage
    secondStage:SecondStage
    thirdStage:ThirdStage
    fourthStage:FourthStage
    createdAt:Date
    expirationDate:Date
    userDetails:User
    spinner:boolean
}

export class BusinessInterest {
    userUuid:string
    sUuid:string
    itemUuid:string
    itemType:ItemType
    quantity:number
}

export class ItemData{
    itemUuid:string
    itemName:string
    itemUrlName:string
    mainImage:string
    sUuid:string
    smeName:string
    priceUnit:string
    price:number
    discountedPrice:number
    discount:number
    quantity:number
    itemType:ItemType
    orderTotal:number
}

export interface CartFilterCount{
    activeCount:number
    rejectedCount:number
    deliveredCount:number
    activeGMV:number
    rejectedGMV:number
    deliveredGMV:number
}

export class FirstStage{
    status:Stage
    rejetMessage:string
}

export class SecondStage{
    status:Stage
    rejetMessage:string
    commentMessage:string
    fileLocation:string
}

export class ThirdStage{
    status:Stage
    rejetMessage:string
    commentMessage:string
    fileLocation:string
}

export class FourthStage{
    status:Stage
    rejetMessage:string
}

export class QuotationRequest{
    quotationType:QuotationType
    commentMessage:string
    fileLocation:string
    cartUuid:string
}

export class PurchaseOrderRequest{
    commentMessage:string
    cartUuid:string 
}

export class RejectRequest{
    rejectMessage:string
    cartUuid:string
}

export enum ItemType{
    PRODUCT = 'PRODUCT',
    SERVICE = 'SERVICE'
}

export enum CartState{
    ACTIVE = "ACTIVE",
	REJECTED = "REJECTED",
	DELETED = "DELETED",
    COMPLETED = "COMPLETED",
    AUTO_CLOSED = "AUTO_CLOSED",
    ALL = "ALL"
}

export enum Stage{
    ORDERED = "ORDERED",
	QUOTATION = "QUOTATION",
	PURCHASE_ORDER = "PURCHASE_ORDER",
	DELIVERED = "DELIVERED",
	REJECTED = "REJECTED",
}

export enum QuotationType{
    AUTO = "AUTO",
    MANUAL = "MANUAL"
}

export interface FileResponse{
    fileLocation:string
}

export interface ReasonMessage {
    id: number
    message: string
}