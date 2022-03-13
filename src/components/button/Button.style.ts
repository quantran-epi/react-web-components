import { useResponsiveCss } from "@theme/responsive/hooks";
import { IComponentStyleHook } from "../base/types";
import { IButtonProps } from "./Button.types";

interface IUseButtonStyleProps extends Partial<IButtonProps> {

}

interface IUseButtonStyle extends IComponentStyleHook {

}

export const useButtonStyle = ({
    margin,
    marginBottom,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginTop,
    marginVertical
}: IUseButtonStyleProps): IUseButtonStyle => {
    const { fromMarginPropsToCss } = useResponsiveCss();

    const _css = (): string => {
        return [
            fromMarginPropsToCss({
                margin,
                marginBottom,
                marginLeft,
                marginRight,
                marginTop,
                marginVertical,
                marginHorizontal
            })
        ].join("");
    }

    return {
        css: _css()
    }
}