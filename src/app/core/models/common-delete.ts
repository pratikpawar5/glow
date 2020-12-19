export interface DeleteObject<T> {
    uuid: string
    type: ObjectType
    cirlceObjects: T
}

export interface BPConfirmationObject<T>{
    uuid:string
    type:ObjectType
    biObjects:T
}

export enum ObjectType {
    PRODUCT,
    SERVICE,
    CERTIFICATE,
    INFRASTRUCTURE,
    MANAGEMENTTEAM,
    GALLERY,
    TEAM,
    BUSINESS_POST_ID,
    RECEIVED_CART_ITEM,
    SENT_CART_ITEM,
    DELETE_CONNECTION,
    DELETE_SENT_REQUEST,
    DELETE_PENDING_REQUEST,
    REMOVE_USER_PROFILE_IMAGE,
    REMOVE_JOB_SEEKER_RESUME,
    REJECTED_CANDIDATE

}

export class DeleteSpecificObject{
    certificate:CertificateDelete
}

export class BusinessPostDelete{

    businessPostId:string
}

export class CertificateDelete{
     crtiUuid:string
     certificateType:string
}

export class InfrastrctureDelete
{
    infraUuid : string
    machineName : string
}

export class GalleryDelete
{
    galleryUuid:string
    galleryTitle:string
}

export class TeamDelete
{
    teamUuid:string
    fullName:string
}

export class ProductDelete
{
    uuid:string
    productDisplayName
}

export class ServiceDelete
{
    serviceUUID:string
    serviceDisplayName
}

export class JobSeekerResumeDelete{
    resumeFileName:string
}