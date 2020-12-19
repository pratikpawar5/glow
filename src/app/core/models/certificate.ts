import { SMEImage } from './sme-image';

export class SMECertificate
{
    crtiUuid : string
    certificateType : string
    certificateDesc : string
    images : Array<SMEImage>
    active:boolean
    isSelected:boolean
    feedbackMessage:string
    frontFeedBackMessage:string
    imageUpdate:boolean
    isApprove:boolean
    isReject:boolean
}