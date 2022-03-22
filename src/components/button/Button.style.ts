import { useTheme } from "@theme/provider";
import { useCssProperty, useResponsiveCss, useResponsiveValue, useStylePropsCss } from "@theme/responsive/hooks";
import { IComponentStyleHook } from "../base/types";
import { IButtonProps } from "./Button.types";

interface IUseButtonStyleProps extends Partial<IButtonProps> {

}

interface IUseButtonStyle extends IComponentStyleHook {

}

export const useButtonStyle = (props: IUseButtonStyleProps): IUseButtonStyle => {
    const StylePropsCss = useStylePropsCss();
    const ResponsiveValue = useResponsiveValue();
    const ResponsiveCss = useResponsiveCss();
    const {
        cursor, shadow, border, transition, bgColor, _hover, _active, scale, overflow, position, opacity
    } = useCssProperty();
    const { theme } = useTheme();

    const _defaultStyle = (): string => {
        let css = [];
        if (props.ripple)
            css.push(overflow(() => ({
                both: "hidden"
            })));
        if (!props.disabled) {
            css.push(_hover(() => `
                    ${shadow(() =>
                (props.type !== "primary" || props.disabledElevation)
                    ? "none" : theme.specs.components.button.shadow._hover.value)}
                `));

            if (props.type === "primary" && !props.disabledElevation)
                css.push(_active(() => `
                    ${shadow(() => theme.specs.shadow[2])}
                    ${scale(() => 0.99)}`));
        }
        else css.push(opacity(() => 0.5))
        
        css.push(position(() => "relative"));
        css.push(border(() => "none"));
        css.push(bgColor(() => "transparent"));
        css.push(transition(() => ({
            duration: 0.1,
            property: "all",
            timingFunc: "ease-in-out"
        })));
        css.push(cursor(() =>
            props.disabled ? "not-allowed" : "pointer"));
        css.push(shadow(() =>
            (props.type !== "primary" || props.disabledElevation)
                ? "none" : theme.specs.components.button.shadow.value));
        return css.join("");
    }

    const _typeCss = (): string => {
        let _normalProps = ResponsiveValue.Union.getResponsiveProps(props.type, {
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
        let _hoverProps = ResponsiveValue.Union.getResponsiveProps(props.type, {
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

        return ResponsiveCss.fromProps(_normalProps)
            .concat(ResponsiveCss.fromProps(_hoverProps, ":hover"));
    }

    const _sizeCss = (): string => {
        return ResponsiveCss.fromProps(ResponsiveValue.Union.getResponsiveProps(props.size, {
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
        return ResponsiveCss.fromProps(ResponsiveValue.Union.getResponsiveProps(props.shape, {
            normal: [{ name: "border-radius", value: theme.specs.components.button.shape.normal.radius }],
            circle: [{ name: "border-radius", value: theme.specs.components.button.shape.circle.radius }],
            rounded: [{ name: "border-radius", value: theme.specs.components.button.shape.rounded.radius }]
        }, "normal"))
    }

    const _stylePropsCss = (): string => {
        return StylePropsCss.group({
            _hover: {
                margin: {
                    margin: props._hover?.margin,
                    marginBottom: props._hover?.marginBottom,
                    marginLeft: props._hover?.marginLeft,
                    marginRight: props._hover?.marginRight,
                    marginTop: props._hover?.marginTop,
                    marginVertical: props._hover?.marginVertical,
                    marginHorizontal: props._hover?.marginHorizontal
                },
                padding: {
                    padding: props._hover?.padding,
                    paddingBottom: props._hover?.paddingBottom,
                    paddingLeft: props._hover?.paddingLeft,
                    paddingRight: props._hover?.paddingRight,
                    paddingTop: props._hover?.paddingTop,
                    paddingVertical: props._hover?.paddingVertical,
                    paddingHorizontal: props._hover?.paddingHorizontal
                },
                border: {
                    border: props._hover?.border,
                    borderBottomWidth: props._hover?.borderBottomWidth,
                    borderColor: props._hover?.borderColor,
                    borderLeftWidth: props._hover?.borderLeftWidth,
                    borderRightWidth: props._hover?.borderRightWidth,
                    borderStyle: props._hover?.borderStyle,
                    borderTopWidth: props._hover?.borderTopWidth,
                    borderWidth: props._hover?.borderWidth
                },
                bgColor: {
                    bgColor: props._hover?.bgColor,
                },
                css: props._hover?.sx?.css
            },
            margin: {
                margin: props.margin,
                marginBottom: props.marginBottom,
                marginLeft: props.marginLeft,
                marginRight: props.marginRight,
                marginTop: props.marginTop,
                marginVertical: props.marginVertical,
                marginHorizontal: props.marginHorizontal
            },
            padding: {
                padding: props.padding,
                paddingBottom: props.paddingBottom,
                paddingLeft: props.paddingLeft,
                paddingRight: props.paddingRight,
                paddingTop: props.paddingTop,
                paddingVertical: props.paddingVertical,
                paddingHorizontal: props.paddingHorizontal
            },
            border: {
                border: props.border,
                borderBottomWidth: props.borderBottomWidth,
                borderColor: props.borderColor,
                borderLeftWidth: props.borderLeftWidth,
                borderRightWidth: props.borderRightWidth,
                borderStyle: props.borderStyle,
                borderTopWidth: props.borderTopWidth,
                borderWidth: props.borderWidth
            },
            bgColor: {
                bgColor: props.bgColor,
            },
            css: props.sx?.css
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