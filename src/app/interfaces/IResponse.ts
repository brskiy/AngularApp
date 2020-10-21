export interface IResponse<T> {
    data: T;
    success: boolean;
    error: string;
}
