import { ResponsiveValue } from "@theme/responsive/types";
import { IBorderProps, IHoverProps, IMarginProps, IPaddingProps, ISystemOverrideProps } from "@theme/style-props/props";
import { LiteralUnion } from "type-fest";
import { IThemeFontWeight, ThemeColorPalette, ThemeShortHandColor } from "../base";

export type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2" | "subtitle1" | "subtitle2" | "button" | "caption";

interface ThemeTypographyBaseStyle {
    htmlFontSize: string;
    tagNameMapping: Record<TypographyVariant, string>;
}

interface ThemeTypographyVariantStyle {
    fontSize: string;
    fontFamily: string;
    fontWeight: number;
    letterSpacing: string;
    lineHeight: number;
}

export interface ITypographyStyleProps extends
    ISystemOverrideProps,
    IMarginProps,
    IPaddingProps,
    IBorderProps,
    IHoverProps<IMarginProps
    & IPaddingProps
    & IBorderProps
    & ISystemOverrideProps> {
    variant?: ResponsiveValue<TypographyVariant>;
    fontSize?: ResponsiveValue<string | number>;
    color?: ResponsiveValue<LiteralUnion<keyof ThemeShortHandColor | keyof ThemeColorPalette, string>>;
    weight?: ResponsiveValue<LiteralUnion<keyof IThemeFontWeight, number>>;
}

export interface IThemeTypography {
    defaultProps: ITypographyStyleProps;
    base: ThemeTypographyBaseStyle;
    components: Record<TypographyVariant, ThemeTypographyVariantStyle>;
}