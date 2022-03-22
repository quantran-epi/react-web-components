import { BorderStyle } from "@theme/style-props/props";
import { CssPropertyNames } from "../constants";

type CssPropertyValueCallback<T = string> = () => T;
type CssPropertyGenerator<T = string> = (callback?: CssPropertyValueCallback<T>) => string;
type CssPseudoGenerator = (children: () => string) => string;

type CssCursorType = React.CSSProperties["cursor"]
type CssPositionType = React.CSSProperties["position"]
type CssOverflowType = React.CSSProperties["overflow"];
type TransitionPropertyGeneratorParams = {
    duration?: string | number;
    durationUnit?: string;
    property?: string;
    timingFunc?: React.CSSProperties["transitionTimingFunction"]
}
type BorderPropertyGeneratorParams = {
    topWidth: number;
    bottomWidth: number;
    leftWidth: number;
    rightWidth: number;
    color: string;
    style: BorderStyle;
    widthUnit?: string;
} | "none"

type FontSizePropertyGeneratorParams = {
    size: number;
    unit?: string;
} | "inherit"

type OverflowPropertyGeneratorParams = {
    x?: CssOverflowType;
    y?: CssOverflowType;
    both?: CssOverflowType;
}

interface IUseCssPropertyProps {

}

type IUseCssProperty = {
    border: CssPropertyGenerator<BorderPropertyGeneratorParams>;
    shadow: CssPropertyGenerator<string>;
    cursor: CssPropertyGenerator<CssCursorType>;
    bgColor: CssPropertyGenerator<string>;
    fontSize: CssPropertyGenerator<FontSizePropertyGeneratorParams>;
    transition: CssPropertyGenerator<TransitionPropertyGeneratorParams>;
    scale: CssPropertyGenerator<number>;
    position: CssPropertyGenerator<CssPositionType>;
    overflow: CssPropertyGenerator<OverflowPropertyGeneratorParams>;
    opacity: CssPropertyGenerator<number>;
    _hover: CssPseudoGenerator;
    _focus: CssPseudoGenerator;
    _active: CssPseudoGenerator;
    _before: CssPseudoGenerator;
    _after: CssPseudoGenerator;
    getValueWithUnit: (value: string | number, unit: string) => string;
    getString: (propName: string, propValue: string) => string;
}

export const useCssProperty = (props?: IUseCssPropertyProps): IUseCssProperty => {

    const _getValueWithUnit = (value: string | number, unit: string = "px"): string => {
        return typeof value === "string" ? value : value.toString().concat(unit);
    }

    const _getString = (propName: string, propValue: string) => {
        return `${propName}:${propValue};`
    }

    const _scale = (callback?: CssPropertyValueCallback<number>): string => {
        return _getString(CssPropertyNames.transform, `scale(${callback()})`)
    }

    const _opacity = (callback?: CssPropertyValueCallback<number>): string => {
        return _getString(CssPropertyNames.opacity, callback().toString());
    }

    const _position = (callback?: CssPropertyValueCallback<CssPositionType>): string => {
        return _getString(CssPropertyNames.position, callback())
    }

    const _overflow = (callback?: CssPropertyValueCallback<OverflowPropertyGeneratorParams>): string => {
        const {
            x,
            y,
            both
        } = callback();
        let css = [];
        if (both !== undefined) css.push(_getString(CssPropertyNames.overflow, both));
        if (x !== undefined) css.push(_getString(CssPropertyNames.overflowX, x));
        if (y !== undefined) css.push(_getString(CssPropertyNames.overflowY, y));
        return css.join("");
    }

    const _border = (callback?: CssPropertyValueCallback<BorderPropertyGeneratorParams | "none">): string => {
        const callbackResult = callback();
        if (typeof callbackResult === "string") return _getString(CssPropertyNames.border, callbackResult);
        const {
            topWidth,
            bottomWidth,
            leftWidth,
            rightWidth,
            widthUnit = "px",
            color,
            style
        } = callbackResult;
        return `
            ${CssPropertyNames.borderTopWidth}:${_getValueWithUnit(topWidth, widthUnit)};
            ${CssPropertyNames.borderLeftWidth}:${_getValueWithUnit(leftWidth, widthUnit)};
            ${CssPropertyNames.borderBottomWidth}:${_getValueWithUnit(bottomWidth, widthUnit)};
            ${CssPropertyNames.borderRightWidth}:${_getValueWithUnit(rightWidth, widthUnit)};
            ${CssPropertyNames.borderColor}:${color};
            ${CssPropertyNames.borderStyle}:${style};
        `;
    }

    const _fontSize = (callback?: CssPropertyValueCallback<FontSizePropertyGeneratorParams>): string => {
        const callbackResult = callback();
        if (typeof callbackResult === "string") return _getString(CssPropertyNames.fontSize, callbackResult);
        const {
            size,
            unit = "px"
        } = callbackResult;
        return _getString(CssPropertyNames.fontSize, _getValueWithUnit(size, unit));
    }

    const _shadow = (callback?: CssPropertyValueCallback<string>): string => {
        return _getString(CssPropertyNames.shadow, callback());
    }

    const _cursor = (callback?: CssPropertyValueCallback<CssCursorType>): string => {
        return _getString(CssPropertyNames.cursor, callback());
    }

    const _bgColor = (callback?: CssPropertyValueCallback<string>): string => {
        return _getString(CssPropertyNames.bgColor, callback());
    }

    const _transition = (callback?: CssPropertyValueCallback<TransitionPropertyGeneratorParams>): string => {
        const {
            duration,
            durationUnit = "s",
            property,
            timingFunc = "ease-in-out"
        } = callback();
        return _getString(CssPropertyNames.transition,
            `${_getValueWithUnit(duration, durationUnit)} ${property} ${timingFunc}`);
    }

    const _hover = (children: () => string): string => {
        return `
            ${CssPropertyNames.pseudoClasses.hover} {
                ${children()}
            }
        `
    }

    const _active = (children: () => string): string => {
        return `
            ${CssPropertyNames.pseudoClasses.active} {
                ${children()}
            }
        `
    }

    const _focus = (children: () => string): string => {
        return `
            ${CssPropertyNames.pseudoClasses.focus} {
                ${children()}
            }
        `
    }

    const _before = (children: () => string): string => {
        return `
            ${CssPropertyNames.pseudoElements.before} {
                ${children()}
            }
        `
    }

    const _after = (children: () => string): string => {
        return `
            ${CssPropertyNames.pseudoElements.after} {
                ${children()}
            }
        `
    }

    return {
        shadow: _shadow,
        cursor: _cursor,
        bgColor: _bgColor,
        transition: _transition,
        fontSize: _fontSize,
        border: _border,
        scale: _scale,
        position: _position,
        overflow: _overflow,
        opacity: _opacity,
        _hover: _hover,
        _active: _active,
        _focus: _focus,
        _before: _before,
        _after: _after,
        getValueWithUnit: _getValueWithUnit,
        getString: _getString
    }
}