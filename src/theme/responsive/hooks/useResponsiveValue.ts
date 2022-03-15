import { useTheme } from '@theme/provider';
import { ResponsiveValue, BreakpointValues, BreakpointType } from '@theme/responsive/types';
import { useMediaQuery } from './useMediaQuery';

type BreakpointValuesTransformer<I extends string | number, O> = (value: I) => O;

interface IUseResponsiveValueProps {

}

interface IUseResponsiveValue {
    getBreakpointValues: <T extends string | number>(value: ResponsiveValue<T>) => T | BreakpointValues<T>;
    transformBreakpointValues: <I extends string | number, O>(value: I | BreakpointValues<I>,
        transformer: BreakpointValuesTransformer<I, O>) => O | BreakpointValues<O>;
}

export const useResponsiveValue = (props?: IUseResponsiveValueProps): IUseResponsiveValue => {
    const { theme } = useTheme();
    const { above, between, only, sortKeys } = useMediaQuery({
        breakpoints: theme.specs.breakpoint.values,
        step: theme.specs.breakpoint.step
    });

    const _getBreakpointValues = <T extends string | number>(value: ResponsiveValue<T>)
        : T | BreakpointValues<T> => {
        if (value instanceof Array) {
            if (value.length === 0) throw new Error("ResponsiveValue cannot be an empty array");
            let breakpointValues: BreakpointValues<T> = {};
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
            return breakpointValues;
        }
        else if (typeof value === "object") {
            let breakpointValues: BreakpointValues<T> = {};
            Object.keys(value).forEach((key: BreakpointType) => {
                if (value[key] !== undefined) breakpointValues[only(key)] = value[key];
            })
            return breakpointValues;
        }

        return value;
    }

    const _transformBreakpointValues = <I extends string | number, O>(value: I | BreakpointValues<I>,
        transformer: BreakpointValuesTransformer<I, O>): O | BreakpointValues<O> => {
        if (typeof value !== "object") return transformer(value);

        let returnObject: BreakpointValues<O> = {};
        Object.keys(value).forEach(breakpoint => {
            returnObject[breakpoint] = transformer(value[breakpoint]);
        });
        return returnObject;
    }

    return {
        getBreakpointValues: _getBreakpointValues,
        transformBreakpointValues: _transformBreakpointValues
    }
}