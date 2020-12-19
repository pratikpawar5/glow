
export class RegisterUser {
    uuid: string;
    username: string;
    userFullName: string;
    userPassword: string;

}


export class User {
    uuid: string
    userEmail: string;
    userMobile: string;
    userFullName: string;
    userDetail: UserDetail;
}

export class UserBasicInfo extends User {
    userType: UserType
}

export class ResetPassword {
    uuid: string;
    newPassword: string
}

export enum UserType {
    NORMAL = "NORMAL", SME = "SME", GLOQR = "GLOQR", ALL = "ALL"
}
export class UserDetail {
    udUuid: string;
    // address: Address[];
    profileImage: string;
    provider: string;
}

export class UserUpdate {
    newUsername: string
    userFullName: string;
    password: string;

}

export class UsernameType {
    static readonly MOBILE: string = "Mobile Number";
    static readonly EMAIL: string = "Email";
}