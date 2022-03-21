import { BorderStyle } from "@theme/style-props/props";
import { CssPropertyNames } from "../constants";

type CssPropertyValueCallback<T = string> = () => T;
type CssPropertyGenerator<T = string> = (callback?: CssPropertyValueCallback<T>) => string;
type CssPseudoGenerator = (children: () => string) => string;

type CssCursorType = React.CSSProperties["cursor"];
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
}

interface IUseCssPropertyProps {

}

type IUseCssProperty = {
    border: CssPropertyGenerator<BorderPropertyGeneratorParams | "none">;
    shadow: CssPropertyGenerator<string>;
    cursor: CssPropertyGenerator<CssCursorType>;
    bgColor: CssPropertyGenerator<string>;
    transition: CssPropertyGenerator<TransitionPropertyGeneratorParams>;
    _hover: CssPseudoGenerator;
    _focus: CssPseudoGenerator;
    _active: CssPseudoGenerator;
    _before: CssPseudoGenerator;
    _after: CssPseudoGenerator;
    getValueWithUnit: (value: string | number, unit: string) => string;
}

export const useCssProperty = (props?: IUseCssPropertyProps): IUseCssProperty => {

    const _getValueWithUnit = (value: string | number, unit: string = "px"): string => {
        return typeof value === "string" ? value : value.toString().concat(unit);
    }

    const _border = (callback?: CssPropertyValueCallback<BorderPropertyGeneratorParams | "none">): string => {
        const callbackResult = callback();
        if (callbackResult === "none") return `${CssPropertyNames.border}:none;`;
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

    const _shadow = (callback?: CssPropertyValueCallback<string>): string => {
        return `${CssPropertyNames.shadow}: ${callback()};`;
    }

    const _cursor = (callback?: CssPropertyValueCallback<CssCursorType>): string => {
        return `${CssPropertyNames.cursor}: ${callback()};`;
    }

    const _bgColor = (callback?: CssPropertyValueCallback<string>): string => {
        return `${CssPropertyNames.bgColor}: ${callback()};`;
    }

    const _transition = (callback?: CssPropertyValueCallback<TransitionPropertyGeneratorParams>): string => {
        const {
            duration,
            durationUnit = "s",
            property,
            timingFunc = "ease-in-out"
        } = callback();
        return `${CssPropertyNames.transition}: ${typeof duration === "string" ? duration : duration.toString().concat(durationUnit)} ${property} ${timingFunc};`;
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
        border: _border,
        _hover: _hover,
        _active: _active,
        _focus: _focus,
        _before: _before,
        _after: _after,
        getValueWithUnit: _getValueWithUnit
    }
}