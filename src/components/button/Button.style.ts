import { useTheme } from "@theme/provider";
import { useBreakpointCss, useCssProperty, useResponsiveValue, useStylePropsCss } from "@theme/responsive/hooks";
import { merge } from "lodash";
import { IComponentStyleHook } from "../base/types";
import { IButtonProps } from "./Button.types";

interface IUseButtonStyleProps extends Partial<IButtonProps> {

}

interface IUseButtonStyle extends IComponentStyleHook {

}

export const useButtonStyle = (props: IUseButtonStyleProps): IUseButtonStyle => {
    const StylePropsCss = useStylePropsCss();
    const ResponsiveValue = useResponsiveValue();
    const BreakpointCss = useBreakpointCss();
    const { cursor, shadow, border, transition, bgColor, _hover } = useCssProperty();
    const { theme } = useTheme();
    const mergeProps = merge({}, theme.specs.components.button.defaultProps, props);

    const _defaultStyle = (): string => {
        return `
            ${border(() => "none")}
            ${bgColor(() => "transparent")}
            ${transition(() => ({
            duration: 0.1,
            property: "all",
            timingFunc: "ease-in-out"
        }))}
            ${cursor(() =>
            mergeProps.disabled ? "not-allowed" : "pointer")}
            ${shadow(() =>
                (mergeProps.type !== "primary" || mergeProps.disabledElevation)
                    ? "none" : theme.specs.components.button.shadow.value)}
            ${_hover(() => `
                ${shadow(() =>
                        (mergeProps.type !== "primary" || mergeProps.disabledElevation)
                            ? "none" : theme.specs.components.button.shadow._hover.value)}
            `)}
        `
    }

    const _typeCss = (): string => {
        let _normalProps = ResponsiveValue.Union.getResponsiveProps(mergeProps.type, {
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
        let _hoverProps = ResponsiveValue.Union.getResponsiveProps(mergeProps.type, {
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

    const _sizeCss = (): string => {
        return BreakpointCss.fromProps(ResponsiveValue.Union.getResponsiveProps(mergeProps.size, {
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

    const _shapeCss = (): string => {
        return BreakpointCss.fromProps(ResponsiveValue.Union.getResponsiveProps(mergeProps.shape, {
            normal: [{ name: "border-radius", value: theme.specs.components.button.shape.normal.radius }],
            circle: [{ name: "border-radius", value: theme.specs.components.button.shape.circle.radius }],
            rounded: [{ name: "border-radius", value: theme.specs.components.button.shape.rounded.radius }]
        }, "normal"))
    }

    const _stylePropsCss = (): string => {
        return StylePropsCss.group({
            _hover: {
                margin: {
                    margin: mergeProps._hover?.margin,
                    marginBottom: mergeProps._hover?.marginBottom,
                    marginLeft: mergeProps._hover?.marginLeft,
                    marginRight: mergeProps._hover?.marginRight,
                    marginTop: mergeProps._hover?.marginTop,
                    marginVertical: mergeProps._hover?.marginVertical,
                    marginHorizontal: mergeProps._hover?.marginHorizontal
                },
                padding: {
                    padding: mergeProps._hover?.padding,
                    paddingBottom: mergeProps._hover?.paddingBottom,
                    paddingLeft: mergeProps._hover?.paddingLeft,
                    paddingRight: mergeProps._hover?.paddingRight,
                    paddingTop: mergeProps._hover?.paddingTop,
                    paddingVertical: mergeProps._hover?.paddingVertical,
                    paddingHorizontal: mergeProps._hover?.paddingHorizontal
                },
                border: {
                    border: mergeProps._hover?.border,
                    borderBottomWidth: mergeProps._hover?.borderBottomWidth,
                    borderColor: mergeProps._hover?.borderColor,
                    borderLeftWidth: mergeProps._hover?.borderLeftWidth,
                    borderRightWidth: mergeProps._hover?.borderRightWidth,
                    borderStyle: mergeProps._hover?.borderStyle,
                    borderTopWidth: mergeProps._hover?.borderTopWidth,
                    borderWidth: mergeProps._hover?.borderWidth
                },
                bgColor: {
                    bgColor: mergeProps._hover?.bgColor,
                },
                css: mergeProps._hover?.sx?.css
            },
            margin: {
                margin: mergeProps.margin,
                marginBottom: mergeProps.marginBottom,
                marginLeft: mergeProps.marginLeft,
                marginRight: mergeProps.marginRight,
                marginTop: mergeProps.marginTop,
                marginVertical: mergeProps.marginVertical,
                marginHorizontal: mergeProps.marginHorizontal
            },
            padding: {
                padding: mergeProps.padding,
                paddingBottom: mergeProps.paddingBottom,
                paddingLeft: mergeProps.paddingLeft,
                paddingRight: mergeProps.paddingRight,
                paddingTop: mergeProps.paddingTop,
                paddingVertical: mergeProps.paddingVertical,
                paddingHorizontal: mergeProps.paddingHorizontal
            },
            border: {
                border: mergeProps.border,
                borderBottomWidth: mergeProps.borderBottomWidth,
                borderColor: mergeProps.borderColor,
                borderLeftWidth: mergeProps.borderLeftWidth,
                borderRightWidth: mergeProps.borderRightWidth,
                borderStyle: mergeProps.borderStyle,
                borderTopWidth: mergeProps.borderTopWidth,
                borderWidth: mergeProps.borderWidth
            },
            bgColor: {
                bgColor: mergeProps.bgColor,
            },
            css: mergeProps.sx?.css
        })
    }

    const _css = (): string => {
        return _defaultStyle()
            .concat(_typeCss())
            .concat(_sizeCss())
            .concat(_shapeCss())
            .concat(_stylePropsCss());
    }

    return {
        css: _css()
    }
}