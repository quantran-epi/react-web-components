import { useTheme } from "@theme/provider";
import { uniq, values } from "lodash";
import { BreakpointType, CssValueType, ICssResponsiveProp, PseudoSelectorType } from "../types";
import { useMediaQuery } from "./useMediaQuery";

enum BreakpointGroupKeyType {
    None = "1",
}

interface ICssPropBreakpointValue {
    propName: string;
    unit: string;
    breakpointValues?: Record<string, CssValueType> | CssValueType;
}

interface ICssBreakpointGroup {
    breakpoint: string;
    cssList: string[];
}

interface IUseBreakpointCssProps {
}

interface IUseBreakpointCss {
    getBreakpointCss: (props: ICssResponsiveProp[]) => string;
    getBreakpointCssWithPseudo: (props: ICssResponsiveProp[], pseudo: PseudoSelectorType) => string;
}

export const useBreakpointCss = (props?: IUseBreakpointCssProps): IUseBreakpointCss => {
    const { theme } = useTheme(); console.log(theme);
    const { above, between, only, sortKeys } = useMediaQuery({
        breakpoints: theme.breakpoint.values,
        step: theme.breakpoint.step
    });

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
        if (typeof value === "string" || typeof value === "number")
            return {
                propName: name,
                unit: unit,
                breakpointValues: value
            }
        if (value instanceof Array) {
            if (value.length === 0) throw new Error("ResponsiveValue cannot be an empty array");
            let breakpointValues = {} as Record<string, CssValueType>;
            let i = 0;
            while (i < sortKeys.length) {
                // undefined means not passed in, null means passed NULL in
                if (value[i] === null) {
                    // do nothing
                }
                else if (value[i] === undefined) {
                    breakpointValues[above(sortKeys[i])] = value[i - 1];
                    break;
                }
                else if (i === sortKeys.length - 1) {
                    breakpointValues[above(sortKeys[i])] = value[i];
                    break;
                }
                else breakpointValues[between(sortKeys[i], sortKeys[i + 1])] = value[i];
                i++;
            }
            return {
                propName: name,
                unit: unit,
                breakpointValues: breakpointValues
            }
        }
        let breakpointValues = {} as Record<string, CssValueType>;
        Object.keys(value).forEach((key: BreakpointType) => {
            if (value[key] !== undefined) breakpointValues[only(key)] = value[key];
        })
        return {
            propName: name,
            unit: unit,
            breakpointValues: breakpointValues
        }
    }

    // get list css prop with breakpoint values from ICssProp[]
    const _getListCssPropBreakpointValue = (props: ICssResponsiveProp[]): ICssPropBreakpointValue[] => {
        return props.map(prop => _getCssPropsBreakpointValue(prop));
    }

    const _getCssPropertyString = (propName: string, propValue: CssValueType, unit: string = "px") => {
        return typeof propValue === "string" ? `${propName}:${propValue};`
            : `${propName}:${propValue}${unit};`;
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
                    breakpointGroup.cssList.push(_getCssPropertyString(cssProp.propName, cssProp.breakpointValues[breakpointGroup.breakpoint], cssProp.unit));
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
                noneBreakpointGroup.cssList.push(_getCssPropertyString(cssProp.propName, cssProp.breakpointValues as CssValueType, cssProp.unit));
            });
        return [noneBreakpointGroup, ...breakpointGroups].filter(e => e.cssList.length !== 0); // remove empty breakpoint group
    }

    const _getBreakpointCss = (props: ICssResponsiveProp[]): string => {
        let breakpointGroups = _getCssBreakpointGroups(props);
        return breakpointGroups.map(group => {
            if (group.breakpoint === BreakpointGroupKeyType.None)
                return group.cssList.join("");
            return `${group.breakpoint} {
                ${group.cssList.join("")}
            }`
        }).join("");
    }

    const _getBreakpointCssWithPseudo = (props: ICssResponsiveProp[], pseudo: PseudoSelectorType): string => {
        let breakpointGroups = _getCssBreakpointGroups(props);
        return breakpointGroups.map(group => {
            if (group.breakpoint === BreakpointGroupKeyType.None)
                return `${pseudo} {
                    ${group.cssList.join("")}
                }`;
            return `${group.breakpoint} {
                ${pseudo} {
                    ${group.cssList.join("")}
                }
            }`
        }).join("");
    }


    return {
        getBreakpointCss: _getBreakpointCss,
        getBreakpointCssWithPseudo: _getBreakpointCssWithPseudo
    }
}
