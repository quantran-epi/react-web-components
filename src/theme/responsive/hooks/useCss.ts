import { IMarginProps, IPaddingProps } from "@theme/style-props";
import { ICssGenerator, ICssGeneratorGroupParams, ICssResponsiveProp, PseudoSelectorType } from '../types';
import { useBreakpointCss } from "./useBreakpointCss";

interface IUseCssProps {
}

interface IUseCss {
    cssGenerator: ICssGenerator;
}

export const useCss = (props?: IUseCssProps): IUseCss => {
    const { getBreakpointCss, getBreakpointCssWithPseudo } = useBreakpointCss();

    const _getMarginCssResponsiveProps = (props: IMarginProps): ICssResponsiveProp[] => {
        let {
            margin,
            marginBottom,
            marginHorizontal,
            marginLeft,
            marginRight,
            marginTop,
            marginVertical
        } = props;
        let o: ICssResponsiveProp[] = [];
        if (margin !== undefined) o.push({ name: "margin", value: margin, unit: "px" });
        if (marginHorizontal !== undefined) {
            o.push({ name: "margin-left", value: marginHorizontal, unit: "px" });
            o.push({ name: "margin-right", value: marginHorizontal, unit: "px" });
        }
        if (marginVertical !== undefined) {
            o.push({ name: "margin-top", value: marginVertical, unit: "px" });
            o.push({ name: "margin-bottom", value: marginVertical, unit: "px" });
        }
        if (marginBottom !== undefined) o.push({ name: "margin-bottom", value: marginBottom, unit: "px" });
        if (marginTop !== undefined) o.push({ name: "margin-top", value: marginTop, unit: "px" });
        if (marginLeft !== undefined) o.push({ name: "margin-left", value: marginLeft, unit: "px" });
        if (marginRight !== undefined) o.push({ name: "margin-right", value: marginRight, unit: "px" });
        return o;
    }

    const _getPaddingCssResponsiveProps = (props: IPaddingProps): ICssResponsiveProp[] => {
        let {
            padding,
            paddingBottom,
            paddingHorizontal,
            paddingLeft,
            paddingRight,
            paddingTop,
            paddingVertical
        } = props;
        let o: ICssResponsiveProp[] = [];
        if (padding !== undefined) o.push({ name: "padding", value: padding, unit: "px" });
        if (paddingHorizontal !== undefined) {
            o.push({ name: "padding-left", value: paddingHorizontal, unit: "px" });
            o.push({ name: "padding-right", value: paddingHorizontal, unit: "px" });
        }
        if (paddingVertical !== undefined) {
            o.push({ name: "padding-top", value: paddingVertical, unit: "px" });
            o.push({ name: "padding-bottom", value: paddingVertical, unit: "px" });
        }
        if (paddingBottom !== undefined) o.push({ name: "padding-bottom", value: paddingBottom, unit: "px" });
        if (paddingTop !== undefined) o.push({ name: "padding-top", value: paddingTop, unit: "px" });
        if (paddingLeft !== undefined) o.push({ name: "padding-left", value: paddingLeft, unit: "px" });
        if (paddingRight !== undefined) o.push({ name: "padding-right", value: paddingRight, unit: "px" });
        return o;
    }

    const margin = (props: IMarginProps, pseudo?: PseudoSelectorType) => {
        return getBreakpointCss(_getMarginCssResponsiveProps(props));
    }

    const padding = (props: IPaddingProps, pseudo?: PseudoSelectorType) => {
        return getBreakpointCss(_getPaddingCssResponsiveProps(props));
    }

    const group = (params: ICssGeneratorGroupParams): string => {
        let _normalCssProps: ICssResponsiveProp[] = [];
        let _hoverCssProps: ICssResponsiveProp[] = [];

        if (params.margin !== undefined) _normalCssProps.push(..._getMarginCssResponsiveProps(params.margin));
        if (params.padding !== undefined) _normalCssProps.push(..._getPaddingCssResponsiveProps(params.padding));

        if (params._hover?.margin !== undefined) _hoverCssProps.push(..._getMarginCssResponsiveProps(params._hover.margin));
        if (params._hover?.padding !== undefined) _hoverCssProps.push(..._getPaddingCssResponsiveProps(params._hover.padding));
        return getBreakpointCss(_normalCssProps)
            .concat(getBreakpointCssWithPseudo(_hoverCssProps, ":hover")) || "";
    }

    return {
        cssGenerator: {
            margin,
            padding,
            group
        }
    }
}