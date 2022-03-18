export interface IBeforeProps<T> {
    _before?: T & {
        content?: string;
    };
}