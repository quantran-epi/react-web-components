import { useTheme } from "@theme/provider";
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

    color = "primary",
    shape = "normal",
    size = "md",
    type = "filled",

    sx
}: IUseButtonStyleProps): IUseButtonStyle => {
    const { fromProps, fromCssString } = useCss();
    const { theme } = useTheme();

    const _typeCss = (): string => {
        let _buttonColor = theme.functions.color.resolve(color);
        switch (type) {
            case "filled": return `
                background-color: ${_buttonColor};
            `;
            case "dashed": return `
                border-style: dashed;
                border-color: ${_buttonColor};
            `;
            case "link": return `
                background-color: transparent;
                color: ${_buttonColor};
            `;
            case "outlined": return `
                background-color: transparent;
                color: ${_buttonColor};
                border-color: ${_buttonColor};
            `;
            case "text": return `
                background-color: transparent;
                color: ${_buttonColor};
            `;
        }
    }

    const _css = (): string => {
        let cssFromCssString = fromCssString.get({
            _hover: (_hover === undefined || _hover.sx === undefined) ? undefined : {
                css: _hover.sx.css
            },
            css: sx?.css
        });
        let cssFromCssProps = fromProps.group({
            _hover: _hover === undefined ? undefined : {
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
                },
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

        return cssFromCssProps.concat(cssFromCssString);
    }

    return {
        css: _css()
    }
}