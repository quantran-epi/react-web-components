import { ICssResponsiveProp } from "@theme/responsive/types"
import { IPaddingProps } from "@theme/style-props/props"
import { IStylePropsHook } from "./IStylePropsHook"

interface IUsePaddingCssProps extends IStylePropsHook<IPaddingProps> {

}

export const usePaddingCssProps = (): IUsePaddingCssProps => {
    const _getResponsiveProps = (props?: IPaddingProps): ICssResponsiveProp[] => {
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
        if (padding !== undefined) responsiveProps.push({ name: "padding", value: padding, unit: "px" });
        if (paddingHorizontal !== undefined) {
            responsiveProps.push({ name: "padding-left", value: paddingHorizontal, unit: "px" });
            responsiveProps.push({ name: "padding-right", value: paddingHorizontal, unit: "px" });
        }
        if (paddingVertical !== undefined) {
            responsiveProps.push({ name: "padding-top", value: paddingVertical, unit: "px" });
            responsiveProps.push({ name: "padding-bottom", value: paddingVertical, unit: "px" });
        }
        if (paddingBottom !== undefined) responsiveProps.push({ name: "padding-bottom", value: paddingBottom, unit: "px" });
        if (paddingTop !== undefined) responsiveProps.push({ name: "padding-top", value: paddingTop, unit: "px" });
        if (paddingLeft !== undefined) responsiveProps.push({ name: "padding-left", value: paddingLeft, unit: "px" });
        if (paddingRight !== undefined) responsiveProps.push({ name: "padding-right", value: paddingRight, unit: "px" });
        return responsiveProps;
    }

    return {
        getResponsiveProps: _getResponsiveProps
    }
}