export interface IAfterProps<T> {
    _after?: T & {
        content?: string;
    };
}