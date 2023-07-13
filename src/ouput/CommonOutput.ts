export interface Respone<T>{
    statusCode : number,
    data : T,
    message : string
}

export interface Pagination {
    total : number,
    perPage: number,
    currentPage: number
}

export interface ListRespone<T> {
    data: Array<T>,
    pagination : Pagination
}