export interface IPageable<T>{
    content:T[]
    last:boolean,
    totalPages:number,
    number:number,
    first:boolean
}