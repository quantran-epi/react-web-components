import { ICssResponsiveProp } from "@theme/responsive/types"
import { IMarginProps } from "@theme/style-props/props"
import { IStylePropsHook } from "./IStylePropsHook"

interface IUseMarginCssProps extends IStylePropsHook<IMarginProps> {

}

export const useMarginCssProps = (): IUseMarginCssProps => {
    const _getResponsiveProps = (props?: IMarginProps): ICssResponsiveProp[] => {
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
        if (margin !== undefined) responsiveProps.push({ name: "margin", value: margin, unit: "px" });
        if (marginHorizontal !== undefined) {
            responsiveProps.push({ name: "margin-left", value: marginHorizontal, unit: "px" });
            responsiveProps.push({ name: "margin-right", value: marginHorizontal, unit: "px" });
        }
        if (marginVertical !== undefined) {
            responsiveProps.push({ name: "margin-top", value: marginVertical, unit: "px" });
            responsiveProps.push({ name: "margin-bottom", value: marginVertical, unit: "px" });
        }
        if (marginBottom !== undefined) responsiveProps.push({ name: "margin-bottom", value: marginBottom, unit: "px" });
        if (marginTop !== undefined) responsiveProps.push({ name: "margin-top", value: marginTop, unit: "px" });
        if (marginLeft !== undefined) responsiveProps.push({ name: "margin-left", value: marginLeft, unit: "px" });
        if (marginRight !== undefined) responsiveProps.push({ name: "margin-right", value: marginRight, unit: "px" });
        return responsiveProps;
    }

    return {
        getResponsiveProps: _getResponsiveProps
    }
}