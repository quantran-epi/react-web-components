import { IThemeBreakpoint } from "@theme/specs/abstract/base";
import { BreakpointValueObject } from "../types";

interface IUseMediaQueryProps {
    breakpoints: BreakpointValueObject;
    step: number;
}

interface IUseMediaQuery {
    above: (key) => string;
    below: (key) => string;
    between: (start, end) => string;
    only: (key) => string;
    not: (key) => string;
}

const sortBreakpointsValues = (breakpoints: BreakpointValueObject) => {
    const breakpointsAsArray = Object.keys(breakpoints).map((key) => ({ key, val: breakpoints[key] })) || [];
    // Sort in ascending order
    breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val);
    return breakpointsAsArray.reduce((acc, obj) => {
        return { ...acc, [obj.key]: obj.val };
    }, {});
};

export const useMediaQuery = ({
    breakpoints,
    step
}: IUseMediaQueryProps): IUseMediaQuery => {
    const sortedValues = sortBreakpointsValues(breakpoints);
    const keys = Object.keys(sortedValues);
    const unit = "px";

    const above = (key) => {
        const value = typeof breakpoints[key] === 'number' ? breakpoints[key] : key;
        return `@media (min-width:${value}${unit})`;
    }

    const below = (key) => {
        const value = typeof breakpoints[key] === 'number' ? breakpoints[key] : key;
        return `@media (max-width:${value - step / 100}${unit})`;
    }

    const between = (start, end) => {
        const endIndex = keys.indexOf(end);

        return (
            `@media (min-width:${typeof breakpoints[start] === 'number' ? breakpoints[start] : start
            }${unit}) and ` +
            `(max-width:${(endIndex !== -1 && typeof breakpoints[keys[endIndex]] === 'number'
                ? breakpoints[keys[endIndex]]
                : end) -
            step / 100
            }${unit})`
        );
    }

    const only = (key) => {
        if (keys.indexOf(key) + 1 < keys.length) {
            return between(key, keys[keys.indexOf(key) + 1]);
        }

        return above(key);
    }

    const not = (key) => {
        // handle first and last key separately, for better readability
        const keyIndex = keys.indexOf(key);
        if (keyIndex === 0) {
            return above(keys[1]);
        }
        if (keyIndex === keys.length - 1) {
            return below(keys[keyIndex]);
        }

        return between(key, keys[keys.indexOf(key) + 1]).replace('@media', '@media not all and');
    }

    return {
        above,
        below,
        between,
        not,
        only
    }
}