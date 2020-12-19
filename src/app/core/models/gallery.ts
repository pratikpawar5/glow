import { SMEImage } from './sme-image';

export class SMEGallery
{
    galleryUuid:string
    description:string
    active:boolean
    galleryTitle:string
    images:Array<SMEImage>
    isSelected:boolean
    frontFeedBackMessage:string
    isApprove:boolean
    isReject:boolean
}