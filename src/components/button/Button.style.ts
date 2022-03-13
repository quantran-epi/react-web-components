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
    marginVertical,

    padding,
    paddingBottom,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingVertical,

}: IUseButtonStyleProps): IUseButtonStyle => {
    const { cssGenerator } = useResponsiveCss();

    const _css = (): string => {
        return [
            cssGenerator.group({
                margin: {
                    margin,
                    marginBottom,
                    marginLeft,
                    marginRight,
                    marginTop,
                    marginVertical,
                    marginHorizontal
                },
                padding: {
                    padding,
                    paddingBottom,
                    paddingHorizontal,
                    paddingLeft,
                    paddingRight,
                    paddingTop,
                    paddingVertical
                }
            })
        ].join("");
    }

    return {
        css: _css()
    }
}