export interface IPageable<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    nextPage: string;
    previousPage: string;
}
