import { BorderStyle, IHoverProps } from "@theme/style-props";
import { MergeExclusive } from 'type-fest';

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonShape = "normal" | "rounded" | "circle";
export type ButtonType = "primary" | "outlined" | "dashed" | "text" | "link";

interface ButtonSizeStyle {
    fontSize: string | number;
    padding: string | number;
}

interface ButtonShapeStyle {
    radius: string | number;
}

interface ButtonTypeStyle {
    bgColor: string;
    fgColor: string;
    borderColor: string;
    borderStyle: BorderStyle;
    borderWidth: number;
}

interface ButtonShadowStyle {
    value: string;
}

export interface IThemeButton {
    size: Record<ButtonSize, ButtonSizeStyle>;
    shape: Record<ButtonShape, ButtonShapeStyle>;
    type: Record<ButtonType, ButtonTypeStyle & IHoverProps<ButtonTypeStyle>>;
    shadow: ButtonShadowStyle & IHoverProps<ButtonShadowStyle>;
}