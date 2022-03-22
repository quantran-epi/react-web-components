import { IBgColorProps, IBorderProps, IMarginProps, IPaddingProps, ISquareSizeProps } from '@theme/style-props/props';
import { CssPropertyNames } from '../constants';
import { ICssPropsGenerator, ICssPropsGeneratorParams, ICssResponsiveProp } from '../types';
import { useResponsiveCss } from "./useResponsiveCss";

interface IUseStylePropsCssProps {
}

interface IUseStylePropsCss {
    group: ICssPropsGenerator;
}

export const useStylePropsCss = (props?: IUseStylePropsCssProps): IUseStylePropsCss => {
    const ResponsiveCss = useResponsiveCss();

    const _group = (params: ICssPropsGeneratorParams): string => {
        let _cssProps: ICssResponsiveProp[] = [];
        let _hoverCssProps: ICssResponsiveProp[] = [];
        let _activeCssProps: ICssResponsiveProp[] = [];
        let _focusCssProps: ICssResponsiveProp[] = [];

        _cssProps.push(...getMarginResponsiveProps(params?.margin));
        _cssProps.push(...getPaddingResponsiveProps(params?.padding));
        _cssProps.push(...getBorderResponsiveProps(params?.border));
        _cssProps.push(...getBgColorResponsiveProps(params?.bgColor));
        _cssProps.push(...getSquareSizeCssProps(params?.squareSize));

        _hoverCssProps.push(...getMarginResponsiveProps(params?._hover?.margin));
        _hoverCssProps.push(...getPaddingResponsiveProps(params?._hover?.padding));
        _hoverCssProps.push(...getBorderResponsiveProps(params?._hover?.border));
        _hoverCssProps.push(...getBgColorResponsiveProps(params?._hover?.bgColor));
        _hoverCssProps.push(...getSquareSizeCssProps(params?._hover?.squareSize));

        _activeCssProps.push(...getMarginResponsiveProps(params?._active?.margin));
        _activeCssProps.push(...getPaddingResponsiveProps(params?._active?.padding));
        _activeCssProps.push(...getBorderResponsiveProps(params?._active?.border));
        _activeCssProps.push(...getBgColorResponsiveProps(params?._active?.bgColor));
        _activeCssProps.push(...getSquareSizeCssProps(params?._active?.squareSize));

        _focusCssProps.push(...getMarginResponsiveProps(params?._focus?.margin));
        _focusCssProps.push(...getPaddingResponsiveProps(params?._focus?.padding));
        _focusCssProps.push(...getBorderResponsiveProps(params?._focus?.border));
        _focusCssProps.push(...getBgColorResponsiveProps(params?._focus?.bgColor));
        _focusCssProps.push(...getSquareSizeCssProps(params?._focus?.squareSize));

        let _css = [];
        if (params?.css !== undefined) _css.push(ResponsiveCss.fromString(params.css));
        if (params?._hover?.css !== undefined) _css.push(ResponsiveCss.fromString(params._hover.css, ":hover"));
        if (params?._active?.css !== undefined) _css.push(ResponsiveCss.fromString(params._hover.css, ":active"));
        if (params?._focus?.css !== undefined) _css.push(ResponsiveCss.fromString(params._hover.css, ":focus"));

        return ResponsiveCss.fromProps(_cssProps)
            .concat(ResponsiveCss.fromProps(_hoverCssProps, ":hover"))
            .concat(ResponsiveCss.fromProps(_activeCssProps, ":active"))
            .concat(ResponsiveCss.fromProps(_focusCssProps, ":focus"))
            .concat(_css.join(""));
    }

    const getMarginResponsiveProps = (props?: IMarginProps): ICssResponsiveProp[] => {
        if (props === undefined) return [];
        let {
            margin,
            marginBottom,
            marginHorizontal,
            marginLeft,
            marginRight,
            marginTop,
            marginVertical
        } = props;
        let responsiveProps: ICssResponsiveProp[] = [];
        if (margin !== undefined) responsiveProps.push({ name: CssPropertyNames.margin, value: margin, unit: "px" });
        if (marginHorizontal !== undefined) {
            responsiveProps.push({ name: CssPropertyNames.marginLeft, value: marginHorizontal, unit: "px" });
            responsiveProps.push({ name: CssPropertyNames.marginRight, value: marginHorizontal, unit: "px" });
        }
        if (marginVertical !== undefined) {
            responsiveProps.push({ name: CssPropertyNames.marginTop, value: marginVertical, unit: "px" });
            responsiveProps.push({ name: CssPropertyNames.marginBottom, value: marginVertical, unit: "px" });
        }
        if (marginBottom !== undefined) responsiveProps.push({ name: CssPropertyNames.marginBottom, value: marginBottom, unit: "px" });
        if (marginTop !== undefined) responsiveProps.push({ name: CssPropertyNames.marginTop, value: marginTop, unit: "px" });
        if (marginLeft !== undefined) responsiveProps.push({ name: CssPropertyNames.marginLeft, value: marginLeft, unit: "px" });
        if (marginRight !== undefined) responsiveProps.push({ name: CssPropertyNames.marginRight, value: marginRight, unit: "px" });
        return responsiveProps;
    }

    const getPaddingResponsiveProps = (props?: IPaddingProps): ICssResponsiveProp[] => {
        if (props === undefined) return [];
        let {
            padding,
            paddingBottom,
            paddingHorizontal,
            paddingLeft,
            paddingRight,
            paddingTop,
            paddingVertical
        } = props;
        let responsiveProps: ICssResponsiveProp[] = [];
        if (padding !== undefined) responsiveProps.push({ name: CssPropertyNames.padding, value: padding, unit: "px" });
        if (paddingHorizontal !== undefined) {
            responsiveProps.push({ name: CssPropertyNames.paddingLeft, value: paddingHorizontal, unit: "px" });
            responsiveProps.push({ name: CssPropertyNames.paddingRight, value: paddingHorizontal, unit: "px" });
        }
        if (paddingVertical !== undefined) {
            responsiveProps.push({ name: CssPropertyNames.paddingTop, value: paddingVertical, unit: "px" });
            responsiveProps.push({ name: CssPropertyNames.paddingBottom, value: paddingVertical, unit: "px" });
        }
        if (paddingBottom !== undefined) responsiveProps.push({ name: CssPropertyNames.paddingBottom, value: paddingBottom, unit: "px" });
        if (paddingTop !== undefined) responsiveProps.push({ name: CssPropertyNames.paddingTop, value: paddingTop, unit: "px" });
        if (paddingLeft !== undefined) responsiveProps.push({ name: CssPropertyNames.paddingLeft, value: paddingLeft, unit: "px" });
        if (paddingRight !== undefined) responsiveProps.push({ name: CssPropertyNames.paddingRight, value: paddingRight, unit: "px" });
        return responsiveProps;
    }

    const getBorderResponsiveProps = (props?: IBorderProps): ICssResponsiveProp[] => {
        if (props === undefined) return [];
        let {
            border,
            borderBottomWidth,
            borderColor,
            borderLeftWidth,
            borderRightWidth,
            borderStyle,
            borderTopWidth,
            borderWidth
        } = props;
        if (border || borderWidth || borderTopWidth || borderBottomWidth || borderRightWidth || borderLeftWidth) borderStyle = borderStyle || "solid";
        let responsiveProps: ICssResponsiveProp[] = [];
        if (border !== undefined) responsiveProps.push({ name: CssPropertyNames.border, value: border, unit: "px" });
        if (borderColor !== undefined) responsiveProps.push({ name: CssPropertyNames.borderColor, value: borderColor, unit: "" });
        if (borderWidth !== undefined) responsiveProps.push({ name: CssPropertyNames.borderWidth, value: borderWidth, unit: "px" });
        if (borderBottomWidth !== undefined) responsiveProps.push({ name: CssPropertyNames.borderBottomWidth, value: borderBottomWidth, unit: "px" });
        if (borderLeftWidth !== undefined) responsiveProps.push({ name: CssPropertyNames.borderLeftWidth, value: borderLeftWidth, unit: "px" });
        if (borderRightWidth !== undefined) responsiveProps.push({ name: CssPropertyNames.borderRightWidth, value: borderRightWidth, unit: "px" });
        if (borderTopWidth !== undefined) responsiveProps.push({ name: CssPropertyNames.borderTopWidth, value: borderTopWidth, unit: "px" });
        if (borderStyle !== undefined) responsiveProps.push({ name: CssPropertyNames.borderStyle, value: borderStyle, unit: "" });
        return responsiveProps;
    }

    const getBgColorResponsiveProps = (props?: IBgColorProps): ICssResponsiveProp[] => {
        if (props === undefined) return [];
        let {
            bgColor,
        } = props;
        let responsiveProps: ICssResponsiveProp[] = [];
        if (bgColor !== undefined) responsiveProps.push({ name: CssPropertyNames.bgColor, value: bgColor, unit: "" });
        return responsiveProps;
    }

    const getSquareSizeCssProps = (props?: ISquareSizeProps): ICssResponsiveProp[] => {
        if (props === undefined) return [];
        let {
            height,
            width
        } = props;
        let responsiveProps: ICssResponsiveProp[] = [];
        if (width !== undefined) responsiveProps.push({ name: CssPropertyNames.width, value: width, unit: "px" });
        if (height !== undefined) responsiveProps.push({ name: CssPropertyNames.height, value: height, unit: "px" });
        return responsiveProps;
    }

    return {
        group: _group
    }
}