export interface FilterResult<T>{
    filter:Filter
    response:Result<T>
    category:any
}

export interface Result<T>{
    result:Array<T>
    totalCount:number
}

export interface Filter{
    discountFilter:Map<string,DiscountFilter>
    price:PriceFilter
    smeFilter:Array<SMEFilter>
}
export interface PriceFilter{
    minPrice:number
    maxPrice:number
    selectedMinPrice:number
    selectedMaxPrice:number
}
export interface SMEFilter{
    smeName:string
    selected:boolean
    count:number
    sUuid:string
}
export interface DiscountFilter{
    value:string
    count:number
    selected:boolean
}