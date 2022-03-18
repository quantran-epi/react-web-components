import { ICssResponsiveProp } from "@theme/responsive/types"
import { IBorderProps } from "@theme/style-props/props";
import { IStylePropsHook } from "./IStylePropsHook"

interface IUseBorderCssProps extends IStylePropsHook<IBorderProps> {

}

export const useBorderCssProps = (): IUseBorderCssProps => {
    const _getResponsiveProps = (props?: IBorderProps): ICssResponsiveProp[] => {
        if (props === undefined) return [];
        let {

        } = props;
        let responsiveProps: ICssResponsiveProp[] = [];
        return responsiveProps;
    }

    return {
        getResponsiveProps: _getResponsiveProps
    }
}