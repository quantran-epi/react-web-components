import { useTheme } from "@theme/provider";
import { uniq } from "lodash";
import { BreakpointType, BreakpointValues, ICssResponsiveProp, PseudoSelectorType, ResponsiveValue } from "../types";
import { useCssProperty } from "./useCssProperty";
import { useMediaQuery } from "./useMediaQuery";
import { useResponsiveValue } from "./useResponsiveValue";

enum BreakpointGroupKeyType {
    None = "1",
}

interface ICssPropBreakpointValue {
    propName: string;
    unit: string;
    breakpointValues?: Record<string, string> | string;
}

interface ICssBreakpointGroup {
    breakpoint: string;
    cssList: string[];
}

interface IUseBreakpointCssProps {
}

interface IUseBreakpointCss {
    fromProps: (props: ICssResponsiveProp[], pseudo?: PseudoSelectorType) => string;
    fromString: (cssString: ResponsiveValue<string>, pseudo?: PseudoSelectorType) => string;
}

export const useBreakpointCss = (props?: IUseBreakpointCssProps): IUseBreakpointCss => {
    const { theme } = useTheme();
    const { above, between, only, sortKeys } = useMediaQuery({
        breakpoints: theme.specs.breakpoint.values,
        step: theme.specs.breakpoint.step
    });
    const CssProperty = useCssProperty();
    const ResponsiveValue = useResponsiveValue();

    const _getBreakpoints = (prop: ICssResponsiveProp): string[] => {
        let { value } = prop;
        if (typeof value === "string" || typeof value === "number")
            return [];

        if (value instanceof Array) {
            let breakpoints = [] as string[];
            let i = 0;
            while (i < sortKeys.length) {
                // not full array passed in, create an above media at this index
                if (value[i] === undefined) {
                    breakpoints.push(above(sortKeys[i]));
                    break;
                }
                // full array passed in
                if (i === sortKeys.length - 1) {
                    breakpoints.push(above(sortKeys[i]));
                    break;
                }
                breakpoints.push(between(sortKeys[i], sortKeys[i + 1]));
                i++;
            }
            return breakpoints;
        }
        let breakpoints = [] as string[];
        Object.keys(value).forEach((key: BreakpointType) => {
            if (value[key] !== undefined) breakpoints.push(only(key));
        })
        return breakpoints;
    }

    const _getUniqueBreakpoints = (props: ICssResponsiveProp[]): string[] => {
        let breakpoints = [] as string[];
        props.forEach(prop => {
            breakpoints.push(..._getBreakpoints(prop))
        });
        breakpoints = uniq(breakpoints);
        return breakpoints;
    }

    // get single css prop breakpoint value from a single ICssProp
    const _getCssPropsBreakpointValue = (prop: ICssResponsiveProp): ICssPropBreakpointValue => {
        let { name, value, unit } = prop;
        return {
            propName: name,
            unit: unit,
            breakpointValues: ResponsiveValue.transformBreakpointValues(ResponsiveValue
                .getBreakpointValues(value), (value) => CssProperty.getValueWithUnit(value, unit))
        }
    }

    // get list css prop with breakpoint values from ICssProp[]
    const _getListCssPropBreakpointValue = (props: ICssResponsiveProp[]): ICssPropBreakpointValue[] => {
        return props.map(prop => _getCssPropsBreakpointValue(prop));
    }

    const _getCssBreakpointGroups = (props: ICssResponsiveProp[]): ICssBreakpointGroup[] => {
        let uniqueBreakpoints = _getUniqueBreakpoints(props);
        let listCssPropBreakpointValue = _getListCssPropBreakpointValue(props);
        let breakpointGroups: ICssBreakpointGroup[] = uniqueBreakpoints.map(breakpoint => ({
            breakpoint: breakpoint,
            cssList: []
        }));
        // iterate all breakpoint values
        listCssPropBreakpointValue.forEach(cssProp => {
            breakpointGroups.forEach(breakpointGroup => {
                if (cssProp.breakpointValues[breakpointGroup.breakpoint] !== undefined)
                    breakpointGroup.cssList.push(CssProperty.getString(cssProp.propName, cssProp.breakpointValues[breakpointGroup.breakpoint]));
            })
        })

        //handle non breakpoint values
        let noneBreakpointGroup: ICssBreakpointGroup = {
            breakpoint: BreakpointGroupKeyType.None,
            cssList: []
        };
        listCssPropBreakpointValue
            .filter(cssProp => typeof cssProp.breakpointValues === "string" ||
                typeof cssProp.breakpointValues === "number")
            .forEach(cssProp => {
                noneBreakpointGroup.cssList.push(CssProperty.getString(cssProp.propName, cssProp.breakpointValues as string));
            });
        return [noneBreakpointGroup, ...breakpointGroups].filter(e => e.cssList.length !== 0); // remove empty breakpoint group
    }

    const _getCssFromCssProps = (props: ICssResponsiveProp[], pseudo?: PseudoSelectorType): string => {
        if (props.length === 0) return "";
        let breakpointGroups = _getCssBreakpointGroups(props);
        return breakpointGroups.map(group => {
            if (group.breakpoint === BreakpointGroupKeyType.None)
                return pseudo === undefined ? group.cssList.join("") :
                    `${pseudo} {
                        ${group.cssList.join("")}
                    }`;
            return `${group.breakpoint} {
                ${pseudo === undefined ? group.cssList.join("") :
                    `${pseudo} {
                        ${group.cssList.join("")}
                    }`}
            }`
        }).join("") || "";
    }

    const _getCssFromCssString = (cssString: ResponsiveValue<string>, pseudo?: PseudoSelectorType): string => {
        let breakpointValues = ResponsiveValue.getBreakpointValues(cssString);
        if (typeof cssString === "string") return pseudo === undefined ? breakpointValues as string :
            `${pseudo} {
                ${breakpointValues};
            }`;
        return Object.keys(breakpointValues).map(breakpoint => `
            ${breakpoint} {
                ${pseudo === undefined ? breakpointValues[breakpoint] :
                `${pseudo} {
                    ${breakpointValues[breakpoint]}
                }` }
            }
        `).join("") || "";
    }


    return {
        fromProps: _getCssFromCssProps,
        fromString: _getCssFromCssString,
    }
}
