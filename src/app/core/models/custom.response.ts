export interface CustomHttpResponse<T> {
    code: number
    message: string
    status: string
    error: boolean
    customErrorCode: number
    data: T
    errorResponse: CustomErrorResponse
}

export interface CustomErrorResponse {
    errorCode: number
    errorMessage: string
    typeDisplayName: string
}