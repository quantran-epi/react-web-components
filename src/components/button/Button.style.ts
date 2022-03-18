import { useTheme } from "@theme/provider";
import { useBreakpointCss, useResponsiveValue, useStylePropsCss } from "@theme/responsive/hooks";
import { IButtonStyleProps } from "@theme/specs/abstract/components";
import { merge } from "lodash";
import { IComponentStyleHook } from "../base/types";

interface IUseButtonStyleProps extends Partial<IButtonStyleProps> {

}

interface IUseButtonStyle extends IComponentStyleHook {

}

export const useButtonStyle = (props: IUseButtonStyleProps): IUseButtonStyle => {
    const StylePropsCss = useStylePropsCss();
    const ResponsiveValue = useResponsiveValue();
    const BreakpointCss = useBreakpointCss();
    const { theme } = useTheme();
    let {
        _hover,
        bgColor,
        size,
        shape,
        type,
        sx,
        disabledElevation,
        ...restProps
    } = merge({}, theme.specs.components.button.defaultProps, props);

    const _defaultStyle = (): string => {
        return `
            border: none;
            background-color: transparent;
            box-shadow: ${(type !== "primary" || disabledElevation) ? "none" : theme.specs.components.button.shadow.value};
            :hover {
                box-shadow: ${(type !== "primary" || disabledElevation) ? "none" : theme.specs.components.button.shadow._hover.value};
            }
        `
    }

    const _type = (): string => {
        let _normalProps = ResponsiveValue.Union.getResponsiveProps(type, {
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
        }, "primary");
        let _hoverProps = ResponsiveValue.Union.getResponsiveProps(type, {
            primary: [
                { name: 'color', value: theme.specs.components.button.type.primary._hover.fgColor },
                { name: 'background-color', value: theme.specs.components.button.type.primary._hover.bgColor },
                { name: 'border-color', value: theme.specs.components.button.type.primary._hover.borderColor },
                { name: 'border-style', value: theme.specs.components.button.type.primary._hover.borderStyle },
                { name: 'border-width', value: theme.specs.components.button.type.primary._hover.borderWidth },
            ],
            dashed: [
                { name: 'color', value: theme.specs.components.button.type.dashed._hover.fgColor },
                { name: 'background-color', value: theme.specs.components.button.type.dashed._hover.bgColor },
                { name: 'border-color', value: theme.specs.components.button.type.dashed._hover.borderColor },
                { name: 'border-style', value: theme.specs.components.button.type.dashed._hover.borderStyle },
                { name: 'border-width', value: theme.specs.components.button.type.dashed._hover.borderWidth },
            ],
            link: [
                { name: 'color', value: theme.specs.components.button.type.link._hover.fgColor },
                { name: 'background-color', value: theme.specs.components.button.type.link._hover.bgColor },
                { name: 'border-color', value: theme.specs.components.button.type.link._hover.borderColor },
                { name: 'border-style', value: theme.specs.components.button.type.link._hover.borderStyle },
                { name: 'border-width', value: theme.specs.components.button.type.link._hover.borderWidth },
            ],
            text: [
                { name: 'color', value: theme.specs.components.button.type.text._hover.fgColor },
                { name: 'background-color', value: theme.specs.components.button.type.text._hover.bgColor },
                { name: 'border-color', value: theme.specs.components.button.type.text._hover.borderColor },
                { name: 'border-style', value: theme.specs.components.button.type.text._hover.borderStyle },
                { name: 'border-width', value: theme.specs.components.button.type.text._hover.borderWidth },
            ],
            outlined: [
                { name: 'color', value: theme.specs.components.button.type.outlined._hover.fgColor },
                { name: 'background-color', value: theme.specs.components.button.type.outlined._hover.bgColor },
                { name: 'border-color', value: theme.specs.components.button.type.outlined._hover.borderColor },
                { name: 'border-style', value: theme.specs.components.button.type.outlined._hover.borderStyle },
                { name: 'border-width', value: theme.specs.components.button.type.outlined._hover.borderWidth },
            ],
        }, "primary");

        return BreakpointCss.fromProps(_normalProps)
            .concat(BreakpointCss.fromProps(_hoverProps, ":hover"));
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
        debugger
        let stylePropsCss = StylePropsCss.group({
            _hover: {
                margin: {
                    margin: _hover?.margin,
                    marginBottom: _hover?.marginBottom,
                    marginLeft: _hover?.marginLeft,
                    marginRight: _hover?.marginRight,
                    marginTop: _hover?.marginTop,
                    marginVertical: _hover?.marginVertical,
                    marginHorizontal: _hover?.marginHorizontal
                },
                padding: {
                    padding: _hover?.padding,
                    paddingBottom: _hover?.paddingBottom,
                    paddingLeft: _hover?.paddingLeft,
                    paddingRight: _hover?.paddingRight,
                    paddingTop: _hover?.paddingTop,
                    paddingVertical: _hover?.paddingVertical,
                    paddingHorizontal: _hover?.paddingHorizontal
                },
                css: _hover?.sx?.css
            },
            margin: {
                margin: restProps.margin,
                marginBottom: restProps.marginBottom,
                marginLeft: restProps.marginLeft,
                marginRight: restProps.marginRight,
                marginTop: restProps.marginTop,
                marginVertical: restProps.marginVertical,
                marginHorizontal: restProps.marginHorizontal
            },
            padding: {
                padding: restProps.padding,
                paddingBottom: restProps.paddingBottom,
                paddingLeft: restProps.paddingLeft,
                paddingRight: restProps.paddingRight,
                paddingTop: restProps.paddingTop,
                paddingVertical: restProps.paddingVertical,
                paddingHorizontal: restProps.paddingHorizontal
            },
            css: sx?.css
        })

        return _defaultStyle()
            .concat(_type())
            .concat(_size())
            .concat(_shape())
            .concat(stylePropsCss);
    }

    return {
        css: _css()
    }
}