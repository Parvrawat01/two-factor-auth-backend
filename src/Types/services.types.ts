export type TServiceResponse<T> = {
    success: true
    messsage: string
    data: T
} | {
    success: false
    messsage: string
    data: null
}