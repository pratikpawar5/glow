
export class BusinessPost {
    smeUuid: string
    businessPostId: string
    title: string
    description: string
    privacy: Privacy
    files: Array<BusinessPostImages>
    image: string
    public tags: Array<string>
    liked: boolean
    likesCount: number = 0;
    publishFeedDto: PublishFeedDto
    isSelected: boolean
    frontFeedBackMessage: string
    active: boolean
    postType: string
    totalFilesSize: number
    isApprove: boolean
    isReject: boolean
}

export enum Privacy {
    CIRCLE, PUBLIC, PRIVATE
}

export class BusinessPostDto extends BusinessPost {
    smeInfo: SMEDto
    taggedWith: Array<SMEDto>
}

export class SMEDto {
    sUuid: string
    smeName: string;
    logoImage: string;
}

export class BusinessPostImages {
    fileId: string
    fileName: string
    fileLocation: string
    fileLocationOne: string
    fileLocationTwo: string
    imageLocation: string
    active: boolean
    size: number
    imgUuid: string
    imageName: string
}

export class PublishFeedDto {
    id: string
    active: boolean
    machineName: string
    description: string
    images: Array<BusinessPostImages>
}