import { useCss } from "@theme/responsive/hooks";
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

    _hover,
}: IUseButtonStyleProps): IUseButtonStyle => {
    const { cssGenerator } = useCss();
    const _css = (): string => {
        return [
            cssGenerator.group({
                _hover: {
                    margin: {
                        margin: _hover.margin,
                        marginBottom: _hover.marginBottom,
                        marginLeft: _hover.marginLeft,
                        marginRight: _hover.marginRight,
                        marginTop: _hover.marginTop,
                        marginVertical: _hover.marginVertical,
                        marginHorizontal: _hover.marginHorizontal
                    },
                    padding: {
                        padding: _hover.padding,
                        paddingBottom: _hover.paddingBottom,
                        paddingLeft: _hover.paddingLeft,
                        paddingRight: _hover.paddingRight,
                        paddingTop: _hover.paddingTop,
                        paddingVertical: _hover.paddingVertical,
                        paddingHorizontal: _hover.paddingHorizontal
                    }
                },
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