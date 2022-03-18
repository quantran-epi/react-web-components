import { useTheme } from "@theme/provider";
import { useBreakpointCss, useComponentBaseCss, useResponsiveValue } from "@theme/responsive/hooks";
import { IButtonStyleProps } from "@theme/specs/abstract/components";
import DefaultThemeSpecs from "@theme/specs/default";
import { merge } from "lodash";
import { IComponentStyleHook } from "../base/types";

interface IUseButtonStyleProps extends Partial<IButtonStyleProps> {

}

interface IUseButtonStyle extends IComponentStyleHook {

}

export const useButtonStyle = (props: IUseButtonStyleProps): IUseButtonStyle => {
    let {
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
        bgColor,
        size,
        shape,
        type,
        sx
    } = merge(DefaultThemeSpecs.components.button.defaultProps, props);
    const ComponentBaseCss = useComponentBaseCss();
    const ResponsiveValue = useResponsiveValue();
    const BreakpointCss = useBreakpointCss();
    const { theme } = useTheme();

    const _defaultStyle = (): string => {
        return `
            border: none;
            background-color: transparent;
        `
    }

    const _type = (): string => {
        return BreakpointCss.fromProps(ResponsiveValue.Union.getResponsiveProps(type, {
            primary: [
                { name: 'color', value: theme.specs.components.button.type.primary.fgColor },
                { name: 'background-color', value: theme.specs.components.button.type.primary.bgColor },
                { name: 'border-color', value: theme.specs.components.button.type.primary.borderColor },
                { name: 'border-style', value: theme.specs.components.button.type.primary.borderStyle },
                { name: 'border-width', value: theme.specs.components.button.type.primary.borderWidth },
            ],
            dashed: [
                { name: 'color', value: theme.specs.components.button.type.dashed.fgColor },
                { name: 'background-color', value: theme.specs.components.button.type.dashed.bgColor },
                { name: 'border-color', value: theme.specs.components.button.type.dashed.borderColor },
                { name: 'border-style', value: theme.specs.components.button.type.dashed.borderStyle },
                { name: 'border-width', value: theme.specs.components.button.type.dashed.borderWidth },
            ],
            link: [
                { name: 'color', value: theme.specs.components.button.type.link.fgColor },
                { name: 'background-color', value: theme.specs.components.button.type.link.bgColor },
                { name: 'border-color', value: theme.specs.components.button.type.link.borderColor },
                { name: 'border-style', value: theme.specs.components.button.type.link.borderStyle },
                { name: 'border-width', value: theme.specs.components.button.type.link.borderWidth },
            ],
            text: [
                { name: 'color', value: theme.specs.components.button.type.text.fgColor },
                { name: 'background-color', value: theme.specs.components.button.type.text.bgColor },
                { name: 'border-color', value: theme.specs.components.button.type.text.borderColor },
                { name: 'border-style', value: theme.specs.components.button.type.text.borderStyle },
                { name: 'border-width', value: theme.specs.components.button.type.text.borderWidth },
            ],
            outlined: [
                { name: 'color', value: theme.specs.components.button.type.outlined.fgColor },
                { name: 'background-color', value: theme.specs.components.button.type.outlined.bgColor },
                { name: 'border-color', value: theme.specs.components.button.type.outlined.borderColor },
                { name: 'border-style', value: theme.specs.components.button.type.outlined.borderStyle },
                { name: 'border-width', value: theme.specs.components.button.type.outlined.borderWidth },
            ],
        }, "primary"))
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
        }, "md"));
    }

    const _shape = (): string => {
        return BreakpointCss.fromProps(ResponsiveValue.Union.getResponsiveProps(shape, {
            normal: [{ name: "border-radius", value: theme.specs.components.button.shape.normal.radius }],
            circle: [{ name: "border-radius", value: theme.specs.components.button.shape.circle.radius }],
            rounded: [{ name: "border-radius", value: theme.specs.components.button.shape.rounded.radius }]
        }, "normal"))
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
            .concat(_defaultStyle())
            .concat(_type())
            .concat(_size())
            .concat(_shape())
            .concat(cssFromCssString);
    }

    return {
        css: _css()
    }
}