import { SMEImage } from './sme-image';

export class SMEInfrastrcture
{
    images : Array<SMEImage>
    infraUuid : string
    machineName : string
    capacity : string
    description : string
    manufacturer : string
    modelName : string
    quantity : string
    active:boolean
    businessPost:boolean
    isSelected:boolean
    frontFeedBackMessage:string
    isApprove:boolean
    isReject:boolean
}