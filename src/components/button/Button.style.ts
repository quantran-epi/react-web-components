import { useResponsiveCss } from "@theme/responsive/hooks";
import { IButtonProps } from "./Button.types";

interface IUseButtonStyleProps extends IButtonProps {
}

interface IUseButtonStyle {
    css: string;
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
                marginHorizontal,
                marginLeft,
                marginRight,
                marginTop,
                marginVertical
            })
        ].join("");
    }

    return {
        css: _css()
    }
}