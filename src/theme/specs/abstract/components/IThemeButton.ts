import { ResponsiveValue } from "@theme/responsive/types";
import { BorderStyle, IBgColorProps, IBorderProps, IHoverProps, IMarginProps, IPaddingProps, ISystemOverrideProps } from "@theme/style-props/props";

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

export interface IButtonStyleProps extends
    ISystemOverrideProps,
    IMarginProps,
    IPaddingProps,
    IBorderProps,
    IBgColorProps,
    IHoverProps<IMarginProps
    & IPaddingProps
    & IBorderProps
    & IBgColorProps
    & ISystemOverrideProps> {
    size?: ResponsiveValue<ButtonSize>;
    shape?: ResponsiveValue<ButtonShape>;
    type?: ResponsiveValue<ButtonType>;
    disabledElevation?: boolean;
}

export interface IThemeButton {
    defaultProps: IButtonStyleProps;
    size: Record<ButtonSize, ButtonSizeStyle>;
    shape: Record<ButtonShape, ButtonShapeStyle>;
    type: Record<ButtonType, ButtonTypeStyle & IHoverProps<ButtonTypeStyle>>;
    shadow: ButtonShadowStyle & IHoverProps<ButtonShadowStyle>;
}