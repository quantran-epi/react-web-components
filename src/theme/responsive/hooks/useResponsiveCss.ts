import { useTheme } from '@theme/provider';
import { IMarginProps, IPaddingProps } from "@theme/style-props";
import { uniq } from 'lodash';
import { ResponsiveValue } from '../types';
import { useMediaQuery } from './useMediaQuery';

enum BreakpointGroupKeyType {
    None = "1",
}

interface ICssProp {
    propName: string;
    unit: string;
    value: ResponsiveValue;
}

interface ICssPropBreakpointValue {
    propName: string;
    unit: string;
    breakpointValues?: Record<string, string | number> | (string | number);
}

interface ICssGeneratorGroupParams {
    margin?: IMarginProps;
    padding?: IPaddingProps;
}

interface ICssBreakpointGroup {
    breakpoint: string;
    cssProps: string[];
}

interface IUseResponsiveCssProps {
}

interface IUseResponsiveCss {
    cssGenerator: {
        margin: (props: IMarginProps) => string;
        padding: (props: IPaddingProps) => string;
        group: (params: ICssGeneratorGroupParams) => string;
    }
}

export const useResponsiveCss = (props?: IUseResponsiveCssProps): IUseResponsiveCss => {
    const { theme } = useTheme();
    const { above, between, sortKeys } = useMediaQuery({
        breakpoints: theme.breakpoint.values,
        step: theme.breakpoint.step
    });

    const _getBreakpoints = (propName: string, propValue: ResponsiveValue, unit: string = 'px'): string[] => {
        if (typeof propValue === "string" || typeof propValue === "number")
            return [];

        if (propValue instanceof Array) {
            let breakpoints = [] as string[];
            let i = 0;
            while (i < 5) {
                if (propValue[i] === undefined) {
                    breakpoints.push(above(sortKeys[i]));
                    break;
                }

                if (i === 4) {
                    breakpoints.push(above(sortKeys[i]));
                    break;
                }
                breakpoints.push(between(sortKeys[i], sortKeys[i + 1]));
                i++;
            }
            return breakpoints;
        }
    }

    const _getUniqueBreakpoints = (props: ICssProp[]): string[] => {
        let breakpoints = [] as string[];
        props.forEach(prop => {
            breakpoints.push(..._getBreakpoints(prop.propName, prop.value, prop.unit))
        });
        breakpoints = uniq(breakpoints);
        return breakpoints;
    }

    // get single css prop breakpoint value from a single ICssProp
    const _getCssPropsBreakpointValue = (propName: string, propValue: ResponsiveValue, unit: string = 'px'): ICssPropBreakpointValue => {
        if (typeof propValue === "string" || typeof propValue === "number")
            return {
                propName: propName,
                unit: unit,
                breakpointValues: propValue
            }
        if (propValue instanceof Array) {
            let breakpointValues = {} as Record<string, string | number>;
            let i = 0;
            while (i < 5) {
                if (propValue[i] === undefined) {
                    breakpointValues[above(sortKeys[i])] = propValue[i - 1];
                    break;
                }

                if (i === 4) {
                    breakpointValues[above(sortKeys[i])] = propValue[i];
                    break;
                }
                breakpointValues[between(sortKeys[i], sortKeys[i + 1])] = propValue[i];
                i++;
            }
            return {
                propName: propName,
                unit: unit,
                breakpointValues: breakpointValues
            }
        }
    }

    const _getCssPropertyString = (propName: string, propValue: string | number, unit: string = "px") => {
        return typeof propValue === "string" ? `${propName}:${propValue};`
            : `${propName}:${propValue}${unit};`;
    }

    // get list css prop with breakpoint values from ICssProp[]
    const _getListCssPropBreakpointValue = (props: ICssProp[]): ICssPropBreakpointValue[] => {
        return props.map(prop => _getCssPropsBreakpointValue(prop.propName, prop.value, prop.unit));
    }

    const _getCssBreakpointGroups = (props: ICssProp[]): ICssBreakpointGroup[] => {
        let uniqueBreakpoints = _getUniqueBreakpoints(props);
        let listCssPropBreakpointValue = _getListCssPropBreakpointValue(props);
        let breakpointGroups: ICssBreakpointGroup[] = uniqueBreakpoints.map(breakpoint => ({
            breakpoint: breakpoint,
            cssProps: []
        }));
        // iterate all breakpoint values
        listCssPropBreakpointValue.forEach(cssProp => {
            breakpointGroups.forEach(breakpointGroup => {
                if (cssProp.breakpointValues[breakpointGroup.breakpoint] !== undefined)
                    breakpointGroup.cssProps.push(_getCssPropertyString(cssProp.propName, cssProp.breakpointValues[breakpointGroup.breakpoint], cssProp.unit));
            })
        })

        //handle non breakpoint values
        let noneBreakpointGroup: ICssBreakpointGroup = {
            breakpoint: BreakpointGroupKeyType.None,
            cssProps: []
        };
        listCssPropBreakpointValue
            .filter(cssProp => typeof cssProp.breakpointValues === "string" ||
                typeof cssProp.breakpointValues === "number")
            .forEach(cssProp => {
                noneBreakpointGroup.cssProps.push(_getCssPropertyString(cssProp.propName, cssProp.breakpointValues as (string | number), cssProp.unit));
            });
        return [noneBreakpointGroup, ...breakpointGroups];
    }

    const _getBreakpointCss = (props: ICssProp[]): string => {
        let breakpointGroups = _getCssBreakpointGroups(props);
        return breakpointGroups.map(group => {
            if (group.breakpoint === BreakpointGroupKeyType.None)
                return group.cssProps.join("");
            return `${group.breakpoint} {
                ${group.cssProps.join("")}
            }`
        }).join("");
    }

    const _cssProperty = (propName: string, propValue: ResponsiveValue, unit: string = 'px'): string => {
        if (typeof propValue === "string")
            return `${propName}: ${propValue}`;
        if (typeof propValue === "number")
            return `${propName}: ${propValue}${unit}`;

        if (propValue instanceof Array) {
            let css = [];
            let i = 0;
            while (i < 5) {
                if (propValue[i] === undefined) {
                    css.push(`${above(sortKeys[i])} {
                        ${propName}: ${propValue[i - 1]}${typeof propValue[i - 1] === "number" ? unit : ""};
                    }`);
                    break;
                }

                if (i === 4) {
                    css.push(`${above(sortKeys[i])} {
                        ${propName}: ${propValue[i]}${typeof propValue[i] === "number" ? unit : ""};
                    }`);
                    break;
                }

                css.push(`${between(sortKeys[i], sortKeys[i + 1])} {
                    ${propName}: ${propValue[i]}${typeof propValue[i] === "number" ? unit : ""};
                }`);
                i++;
            }
            return css.join("");
        }
    }

    const _getMarginCssProps = (props: IMarginProps): ICssProp[] => {
        let {
            margin,
            marginBottom,
            marginHorizontal,
            marginLeft,
            marginRight,
            marginTop,
            marginVertical
        } = props;
        let o: ICssProp[] = [];
        if (margin !== undefined) o.push({ propName: "margin", value: margin, unit: "px" });
        if (marginHorizontal !== undefined) {
            o.push({ propName: "margin-left", value: marginHorizontal, unit: "px" });
            o.push({ propName: "margin-right", value: marginHorizontal, unit: "px" });
        }
        if (marginVertical !== undefined) {
            o.push({ propName: "margin-top", value: marginVertical, unit: "px" });
            o.push({ propName: "margin-bottom", value: marginVertical, unit: "px" });
        }
        if (marginBottom !== undefined) o.push({ propName: "margin-bottom", value: marginBottom, unit: "px" });
        if (marginTop !== undefined) o.push({ propName: "margin-top", value: marginTop, unit: "px" });
        if (marginLeft !== undefined) o.push({ propName: "margin-left", value: marginLeft, unit: "px" });
        if (marginRight !== undefined) o.push({ propName: "margin-right", value: marginRight, unit: "px" });
        return o;
    }

    const _getPaddingCssProps = (props: IPaddingProps): ICssProp[] => {
        let {
            padding,
            paddingBottom,
            paddingHorizontal,
            paddingLeft,
            paddingRight,
            paddingTop,
            paddingVertical
        } = props;
        let o: ICssProp[] = [];
        if (padding !== undefined) o.push({ propName: "padding", value: padding, unit: "px" });
        if (paddingHorizontal !== undefined) {
            o.push({ propName: "padding-left", value: paddingHorizontal, unit: "px" });
            o.push({ propName: "padding-right", value: paddingHorizontal, unit: "px" });
        }
        if (paddingVertical !== undefined) {
            o.push({ propName: "padding-top", value: paddingVertical, unit: "px" });
            o.push({ propName: "padding-bottom", value: paddingVertical, unit: "px" });
        }
        if (paddingBottom !== undefined) o.push({ propName: "padding-bottom", value: paddingBottom, unit: "px" });
        if (paddingTop !== undefined) o.push({ propName: "padding-top", value: paddingTop, unit: "px" });
        if (paddingLeft !== undefined) o.push({ propName: "padding-left", value: paddingLeft, unit: "px" });
        if (paddingRight !== undefined) o.push({ propName: "padding-right", value: paddingRight, unit: "px" });
        return o;
    }

    const margin = (props: IMarginProps) => {
        return _getBreakpointCss(_getMarginCssProps(props));
    }

    const padding = (props: IPaddingProps) => {
        return _getBreakpointCss(_getPaddingCssProps(props));
    }

    const group = (params: ICssGeneratorGroupParams): string => {
        let cssProps: ICssProp[] = [];
        if (params.margin !== undefined) cssProps.push(..._getMarginCssProps(params.margin));
        if (params.padding !== undefined) cssProps.push(..._getPaddingCssProps(params.padding));
        return _getBreakpointCss(cssProps);
    }

    return {
        cssGenerator: {
            margin,
            padding,
            group
        }
    }
}