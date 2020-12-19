import { Image, State, QuotationFormat } from './common';
import { SMEInformationVo } from './sme';

export class CommonFields{
    price:number
    discount:number
    discountedPrice:number
    smeName:string
    sUuid:string
    mainImage:string
    priceUnit:string
    addedToCart:boolean
    biCount:number
}

export class ProductResponse extends CommonFields{
    productUuid:string
    productName:string
    productUrlName:string
    minOrderQty:number
}

export class ProductVO extends ProductResponse{
    productState:State
    active:boolean
    modified:boolean
    createdAt:Date
    updatedAt:Date
    feedBackMessage:string
}

export class Product extends ProductResponse{
    description:string
    location:string
    specifications: Map<string, string>
    images:Array<Image>
    subCategory:ProductSubCategory
    smeInfo:SMEInformationVo
    frontFeedBackMessage:string
    isSelected:boolean
    productState:State
    active:boolean
    stock:number
    isApprove:boolean
    isReject:boolean
    feedBackMessage:string

}

export class ProductDTO{
    productUuid:string
    productName:string
    minOrderQty:number
    stock:number
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

export class Category{
    categoryUuid:string
    fileLocation:string
    categoryName:string
    urlName:string
}

export class SubCategory{
    subCategoryUuid:string
    fileLocation:string
    subCategoryName:string
    urlName:string
}

export class ProductSubCategory extends SubCategory{
    productsCount:number
    productCategory:ProductCategory
}

export class ProductCategory extends Category{
    productsCount:number
    subCategories:Array<ProductSubCategory>
}
export class OtherCategory{
    categoryUuid:string
    customCategory:string
    customSubCategory:string
}