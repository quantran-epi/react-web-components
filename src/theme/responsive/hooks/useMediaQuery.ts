import { BreakpointType, BreakpointValueObject } from "../types";

interface IUseMediaQueryProps {
    breakpoints: BreakpointValueObject;
    step: number;
}

interface IUseMediaQuery {
    above: (key: BreakpointType | number) => string;
    below: (key: BreakpointType | number) => string;
    between: (start: BreakpointType | number, end: BreakpointType | number) => string;
    only: (key: BreakpointType) => string;
    not: (key: BreakpointType) => string;
    sortKeys: BreakpointType[];
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
    const keys = Object.keys(sortedValues) as BreakpointType[];
    const unit = "px";

    const above = (key: BreakpointType | number) => {
        const value = typeof breakpoints[key] === 'number' ? breakpoints[key] : key;
        return `@media (min-width:${value}${unit})`;
    }

    const below = (key: BreakpointType | number) => {
        const value = typeof breakpoints[key] === 'number' ? breakpoints[key] : key;
        return `@media (max-width:${value - step / 100}${unit})`;
    }

    const between = (start: BreakpointType | number, end: BreakpointType | number) => {
        const endIndex = keys.indexOf(end.toString() as any);

        return (
            `@media (min-width:${typeof breakpoints[start] === 'number' ? breakpoints[start] : start
            }${unit}) and ` +
            `(max-width:${(endIndex !== -1 && typeof breakpoints[keys[endIndex]] === 'number'
                ? breakpoints[keys[endIndex]] : end) as number - step / 100}${unit})`
        );
    }

    const only = (key: BreakpointType) => {
        if (keys.indexOf(key) + 1 < keys.length) {
            return between(key, keys[keys.indexOf(key) + 1]);
        }

        return above(key);
    }

    const not = (key: BreakpointType) => {
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
        only,
        sortKeys: keys
    }
}