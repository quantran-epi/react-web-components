import { useTheme } from "@theme/provider";
import { useBreakpointCss, useComponentBaseCss, useResponsiveValue } from "@theme/responsive/hooks";
import { IComponentStyleHook } from "../base/types";
import { IButtonStyleProps } from "./Button.types";

interface IUseButtonStyleProps extends Partial<IButtonStyleProps> {

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

    border,
    borderBottomWidth,
    borderColor,
    borderLeftWidth,
    borderRightWidth,
    borderStyle,
    borderTopWidth,
    borderWidth,

    _hover,

    color = "primary",
    shape = "normal",
    size = "md",
    type = "filled",

    sx
}: IUseButtonStyleProps): IUseButtonStyle => {
    const ComponentBaseCss = useComponentBaseCss();
    const ResponsiveValue = useResponsiveValue();
    const BreakpointCss = useBreakpointCss();
    const { theme } = useTheme();

    const _type = (): string => {
        return "";
    }

    const _size = (): string => {
        return BreakpointCss.fromProps(ResponsiveValue.Union.getResponsiveProps(size, {
            sm: [
                { name: "padding", value: theme.specs.components.button.size.sm.padding },
                { name: "font-size", value: theme.specs.components.button.size.sm.fontSize }
            ],
            md: [
                { name: "padding", value: theme.specs.components.button.size.md.padding },
                { name: "font-size", value: theme.specs.components.button.size.md.fontSize }
            ],
            lg: [
                { name: "padding", value: theme.specs.components.button.size.lg.padding },
                { name: "font-size", value: theme.specs.components.button.size.lg.fontSize }
            ]
        }));
    }

    const _shape = (): string => {
        return BreakpointCss.fromProps(ResponsiveValue.Union.getResponsiveProps(shape, {
            normal: [{ name: "border-radius", value: theme.specs.components.button.shape.normal.radius }],
            circle: [{ name: "border-radius", value: theme.specs.components.button.shape.circle.radius }],
            rounded: [{ name: "border-radius", value: theme.specs.components.button.shape.rounded.radius }]
        }))
    }

    const _css = (): string => {
        let cssFromCssString = ComponentBaseCss.fromString({
            _hover: (_hover === undefined || _hover.sx === undefined) ? undefined : {
                css: _hover.sx.css
            },
            css: sx?.css
        });
        let cssFromCssProps = ComponentBaseCss.fromProps.group({
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

        return cssFromCssProps
            .concat(_size())
            .concat(_shape())
            .concat(cssFromCssString);
    }

    return {
        css: _css()
    }
}