//for gitlab gcp server build
//command : ng build --prod
const URL = 'https://www.gloqr.com/'
const BASE_URL = URL + 'api/';
export const environment = {

    production: true,

    CONTENT_SERVER: URL + 'gloqr/cdn',

    SEARCH_URL: URL + 'api',

    CONTENT_SERVER_DELETE_API: BASE_URL + 'cdn/file/',

    SERVICE_URL: BASE_URL + 'services/',

    PRODUCT_URL: BASE_URL + 'products/',

    SME_INFORMATION_URL: BASE_URL + 'smes/',

    JOBS_URL: BASE_URL + 'vacancies/',

    JOB_SEEKER: BASE_URL + 'jobseekers/',

    BUSINESS_POST: BASE_URL + 'business-feeds/',

    USER_URL: BASE_URL + 'users/',

    COMMON_SERVICE_URL: BASE_URL + 'common-service/',

    PRICING_URL: BASE_URL + 'pricing/',

    PAYMENT_URL: BASE_URL + 'payment/',

    CIRCLE_URL: BASE_URL + 'circle/',

    CIRCLE_URL_FOR_SMES: BASE_URL + 'circle',

    CART_URL: BASE_URL + 'cart/',

    NOTIFICATION_URL: URL + 'notification'
};


/*
* For easier debugging in development mode, you can import the following file
* to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
*
* This import should be commented out in production mode because it will have a negative impact
* on performance if an error is thrown.
*/
// import 'zone.js/dist/zone-error'; // Included with Angular CLI.