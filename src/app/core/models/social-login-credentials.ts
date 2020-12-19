export class SocialLoginCredentials {
    public static readonly googleClientId: string = '913328878080-l1hu2r2ekv7rqsk8mi9ejo551pkc57fq.apps.googleusercontent.com'
    public static readonly facebookClientId: string = '2447419352161233';
    public static readonly facebookClientSecret: string = '6f2dc1f6ea94cb8cbec3740ed36afa32';
}
export class FacebookUser {
    facebookClientId: string;
    facebookClientSecret: string;
    provider: string;
    id: string;
    email: string;
    name: string;
    image: string;
    token?: string;
    idToken?: string;
}
export class GoogleOauthToken{

    authToken:string;
    clientId:string;
}