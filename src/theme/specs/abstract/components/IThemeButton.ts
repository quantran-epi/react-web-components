export type ButtonSize = "sm" | "md" | "lg";
export type ButtonColor = "primary" | "secondary" | "success" | "danger" | "warning" | "default";
export type ButtonShape = "normal" | "rounded" | "circle";
export type ButtonType = "filled" | "outlined" | "dashed" | "text" | "link";

interface ButtonSizeStyle {
    fontSize: string | number;
    padding: string | number;
}

interface ButtonShapeStyle {
    radius: string | number;
}

export interface IThemeButton {
    size: Record<ButtonSize, ButtonSizeStyle>;
    color: Record<ButtonColor, string>;
    shape: Record<ButtonShape, ButtonShapeStyle>;
    shadow: string;
}