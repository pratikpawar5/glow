import { SMEAddress, SMEInformationVo } from './sme';

export class BusinessCircle {
    smeId: string;
    circlePrivacy: CirclePrivacy
    sendReqCount: number = 0;
    receivedReqCount: number = 0;
    connectionCount: number = 0;
    sendRequests: SMECircleDto[];
    receiveRequests: SMECircleDto[];
}

export class SMECircleDto {
    smeName: string;
    receiveReqUuid: string;
    sendReqUuid: string;
    mutualConnectionCount: number;
    connectionUuid: string;
    status: string
    logoImage: string
    mutualConnections: SMECircleDto[]
    address: SMEAddress
    creationDate: Date
    sUuid: string;
    selected: boolean
}

export class CountAndData {
    seeMoreCount: number
    data: Array<SMECircleDto>
}

export class PrivateConnectionResponse {
    connectionId: string
    selected: boolean
}

export enum CirclePrivacy {
    CIRCLE, PUBLIC, PRIVATE
}

export class CircleStatus {
    public readonly SENT_REQ: string = "SENT_REQ";
    public readonly RECIEVED_REQ: string = "RECIEVED_REQ";
    public readonly CONNECTED: string = "CONNECTED";
    public readonly NEW: string = "NEW";
    public readonly OWNER: string = "OWNER";
}

export class CircleInviteStatus {
    reqSenderSme: SMEInformationVo;
    reqReceiverSme: SMEInformationVo;
    circleState: CircleStatus;
}

export enum CircleState {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    CANCELED = "CANCELED",
    CONNECTED = "CONNECTED",
    DISCONNECTED = "DISCONNECTED",
    ALL = "ALL"
}