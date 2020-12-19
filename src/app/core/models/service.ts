import { Image, State } from './common';
import { SMEInformationVo } from './sme';
import { CommonFields, SubCategory, Category, OtherCategory } from './product';

export class ServiceResponse extends CommonFields{
    serviceUuid:string
    serviceName:string
    serviceUrlName:string
}

export class ServiceVO extends ServiceResponse{
    serviceState:State
    active:boolean
    modified:boolean
    createdAt:Date
    updatedAt:Date
    feedBackMessage:string
}

export class Service extends ServiceResponse{
    description:string
    location:string
    specifications: Map<string, string>
    images:Array<Image>
    subCategory:ServiceSubCategory
    smeInfo:SMEInformationVo
    frontFeedBackMessage:string
    isSelected:boolean
    serviceState:State
    active:boolean
    isApprove:boolean
    isReject:boolean
}


export class ServiceDTO{
    serviceUuid:string
    serviceName:string
    subCategoryUuid:string
    price:number
    priceUnit:string
    discount:number
    description:string
    location:string
    termsAndCondition:string
    gst:number
    quotationFormat:string
    specifications: Map<string, string>
    images :Array<Image>
    active:boolean
    businessPost:boolean
    autoQuotation:boolean
    deletedImages :Array<Image>
    otherCategory:OtherCategory
    mainImage:string
}

export class ServiceSubCategory extends SubCategory{
    servicesCount:number
    serviceCategory:ServiceCategory
}

export class ServiceCategory extends Category{
    servicesCount:number
    subCategories:Array<ServiceSubCategory>
}