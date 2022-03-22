export type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2" | "subtitle1" | "subtitle2" | "button" | "caption";

interface ThemeTypographyBaseStyle {
    htmlFontSize: string;
}

interface ThemeTypographyVariantStyle {
    fontSize: string;
    fontFamily: string;
    fontWeight: number;
    letterSpacing: string;
    lineHeight: number;
}

export interface IThemeTypography {
    base: ThemeTypographyBaseStyle;
    components: Record<TypographyVariant, ThemeTypographyVariantStyle>;
}