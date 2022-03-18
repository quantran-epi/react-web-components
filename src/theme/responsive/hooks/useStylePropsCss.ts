import { useBorderCssProps, useMarginCssProps, usePaddingCssProps } from "@theme/style-props/hooks";
import { ICssPropsGenerator, ICssPropsGeneratorParams, ICssResponsiveProp } from '../types';
import { useBreakpointCss } from "./useBreakpointCss";

interface IUseStylePropsCssProps {
}

interface IUseStylePropsCss {
    group: ICssPropsGenerator;
}

export const useStylePropsCss = (props?: IUseStylePropsCssProps): IUseStylePropsCss => {
    const BreakpointCss = useBreakpointCss();
    const { getResponsiveProps: getMarginResponsiveProps } = useMarginCssProps();
    const { getResponsiveProps: getPaddingResponsiveProps } = usePaddingCssProps();
    const { getResponsiveProps: getBorderResponsiveProps } = useBorderCssProps();

    const _group = (params: ICssPropsGeneratorParams): string => {
        let _cssProps: ICssResponsiveProp[] = [];
        let _hoverCssProps: ICssResponsiveProp[] = [];
        let _activeCssProps: ICssResponsiveProp[] = [];
        let _focusCssProps: ICssResponsiveProp[] = [];

        _cssProps.push(...getMarginResponsiveProps(params?.margin));
        _cssProps.push(...getPaddingResponsiveProps(params?.padding));
        _cssProps.push(...getBorderResponsiveProps(params?.border));

        _hoverCssProps.push(...getMarginResponsiveProps(params?._hover?.margin));
        _hoverCssProps.push(...getPaddingResponsiveProps(params?._hover?.padding));

        _activeCssProps.push(...getMarginResponsiveProps(params?._active?.margin));
        _activeCssProps.push(...getPaddingResponsiveProps(params?._active?.padding));

        _focusCssProps.push(...getMarginResponsiveProps(params?._focus?.margin));
        _focusCssProps.push(...getPaddingResponsiveProps(params?._focus?.padding));

        let _css = [];
        if (params?.css !== undefined) _css.push(BreakpointCss.fromString(params.css));
        if (params?._hover?.css !== undefined) _css.push(BreakpointCss.fromString(params._hover.css, ":hover"));
        if (params?._active?.css !== undefined) _css.push(BreakpointCss.fromString(params._hover.css, ":active"));
        if (params?._focus?.css !== undefined) _css.push(BreakpointCss.fromString(params._hover.css, ":focus"));

        return BreakpointCss.fromProps(_cssProps)
            .concat(BreakpointCss.fromProps(_hoverCssProps, ":hover"))
            .concat(BreakpointCss.fromProps(_activeCssProps, ":active"))
            .concat(BreakpointCss.fromProps(_focusCssProps, ":focus"))
            .concat(_css.join());
    }

    return {
        group: _group
    }
}