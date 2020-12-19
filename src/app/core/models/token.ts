export interface JwtToken{
    name:string
    profileImage:string
    usertype:string
    smeid:string
    uuid:string
    sub:string
    role:string,
    iat:Date
    exp:Date
}