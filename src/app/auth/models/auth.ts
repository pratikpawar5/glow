export enum UserState {
    VERIFIED, UN_VERIFIED
}

export class FlowType {
    static readonly OTP_LOGIN: string = "OTP_LOGIN";
    static readonly FORGOT_PASS: string = "FORGOT_PASS";
    static readonly SIGN_UP_VERIFICATION: string = "SIGN_UP_VERIFICATION";
}

export interface Credentials {
    username: string
    password: string
}

export interface AuthToken {
    token: string
}

export class OtpData {
    username: string
    uuid: string
    otp: number
    userState: UserState
    flowType: FlowType
}

