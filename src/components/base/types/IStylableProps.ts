export interface IStylableProps {
    className?: string;
    style?: React.CSSProperties & {
        css?: string;
    };
}