import { useTheme } from '@theme/provider';
import { ResponsiveValue, BreakpointValues, BreakpointType, ICssProps, ICssResponsiveProp } from '@theme/responsive/types';
import { useMediaQuery } from './useMediaQuery';

type BreakpointValuesTransformer<I extends string | number, O> = (value: I) => O;

interface IUseResponsiveValueProps {

}

interface IUseResponsiveValue {
    getValueAt: <I extends string | number | symbol>(value: ResponsiveValue<I>, breakpoint: BreakpointType) => I | undefined;
    getBreakpointValues: <T extends string | number>(value: ResponsiveValue<T>) => T | BreakpointValues<T>;
    transformBreakpointValues: <I extends string | number, O>(value: I | BreakpointValues<I>,
        transformer: BreakpointValuesTransformer<I, O>) => O | BreakpointValues<O>;
    Union: {
        getResponsiveProps: <I extends string | number | symbol>(value: ResponsiveValue<I>, mapper: Record<I, ICssProps[]>, defaultValue: I) => ICssResponsiveProp[];
        getResponsivePropsWithDependencies: <I extends string | number | symbol, D1 extends string | number | symbol, D2 extends string | number | symbol>(
            value: ResponsiveValue<I>,
            mapper: (value: I, d1: D1, d2?: D2) => Record<I, ICssProps[]>,
            dependencies: [ResponsiveValue<D1>, ResponsiveValue<D2>?],
            defaultValue: I) => ICssResponsiveProp[];
    }
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
                    if (value[i - 1] === null) break;
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

    const _getValueAt = <I extends string | number | symbol>(value: ResponsiveValue<I>, breakpoint: BreakpointType): I | undefined => {
        if (value instanceof Array) {
            if (value.length === 0) return undefined;
            let breakpointIndex = sortKeys.findIndex(e => e === breakpoint);
            if (value[breakpointIndex] !== undefined) return value[breakpointIndex];

            let i = breakpointIndex - 1;
            while (i >= 0) {
                if (value[i] !== undefined) return value[i];
                i--;
            }
            return undefined;
        }
        else if (typeof value === "object") {
            return value[breakpoint];
        }
        return value;
    }

    const _standardizeValue = <T>(value: ResponsiveValue<T>, defaultValue?: T): ResponsiveValue<T> => {
        if (value instanceof Array) {
            if (value.length === sortKeys.length) return value;
            let standardValue: T[] = [];
            for (let i = 0; i < sortKeys.length; i++) {
                if (value[i] !== undefined) standardValue[i] = value[i];
                else if (i > 0) standardValue[i] = standardValue[i - 1];
            }
            return standardValue;
        }
        else if (typeof value === "object") {
            if (Object.keys(value).length === sortKeys.length) return value;
            let standardValue = {};
            sortKeys.forEach(breakpoint => {
                if (value[breakpoint] !== undefined) standardValue[breakpoint] = value[breakpoint];
                else standardValue[breakpoint] = defaultValue;
            })
            return standardValue;
        }
        return value || defaultValue;
    }

    const _getResponsivePropsFromUnion = <I extends string | number | symbol>(
        value: ResponsiveValue<I>,
        mapper: Record<I, ICssProps[]>,
        defaultValue: I): ICssResponsiveProp[] => {
        value = _standardizeValue(value, defaultValue);
        if (value instanceof Array) {
            let responsiveProps: ICssResponsiveProp[] = [];
            for (let i = 0; i < value.length; i++) {
                mapper[value[i]].forEach(cssProp => { // update existing responsive prop
                    let existedProp = responsiveProps.find(p => p.name === cssProp.name);
                    if (existedProp) {
                        existedProp.value[i] = cssProp.value;
                    }
                    else { // push new responsive prop value at this breakpoint
                        responsiveProps.push({
                            name: cssProp.name,
                            unit: cssProp.unit,
                            value: [cssProp.value]
                        })
                    }
                })
            }
            return responsiveProps;
        }
        else if (typeof value === "object") {
            let responsiveProps: ICssResponsiveProp[] = [];
            Object.keys(value).forEach((breakpoint: BreakpointType) => {
                mapper[value[breakpoint]].forEach(cssProp => { // update existing responsive prop
                    let existedProp = responsiveProps.find(p => p.name === cssProp.name);
                    if (existedProp) {
                        existedProp.value[breakpoint] = cssProp.value;
                    }
                    else { // push new responsive prop value at this breakpoint
                        responsiveProps.push({
                            name: cssProp.name,
                            unit: cssProp.unit,
                            value: {
                                [breakpoint]: cssProp.value
                            }
                        })
                    }
                })
            })
            return responsiveProps;
        }
        return mapper[value as I].map(prop => ({
            name: prop.name,
            value: prop.value,
            unit: prop.unit
        }))
    }

    const _getResponsivePropsFromUnionWithDependencies = <I extends string | number | symbol, D1 extends string | number | symbol, D2 extends string | number | symbol>(
        value: ResponsiveValue<I>,
        mapper: (value?: I, d1?: D1, d2?: D2) => Record<I, ICssProps[]>,
        dependencies: [ResponsiveValue<D1>, ResponsiveValue<D2>?],
        defaultValue?: I)
        : ICssResponsiveProp[] => {
        value = _standardizeValue(value, defaultValue);
        if (value instanceof Array) {
            let responsiveProps: ICssResponsiveProp[] = [];
            for (let i = 0; i < value.length; i++) {
                let mapperObject = mapper(value[i],
                    _getValueAt<D1>(dependencies[0], sortKeys[i]),
                    _getValueAt<D2>(dependencies[1], sortKeys[i]));
                let cssProps = mapperObject[value[i]];
                cssProps.forEach(cssProp => { // push new responsive prop value at this breakpoint
                    let existedProp = responsiveProps.find(p => p.name === cssProp.name);
                    if (existedProp) {
                        existedProp.value[i] = cssProp.value;
                    }
                    else {
                        let valueArr = new Array(i + 1).fill(null);
                        valueArr[i] = cssProp.value;
                        responsiveProps.push({
                            name: cssProp.name,
                            unit: cssProp.unit,
                            value: valueArr
                        })
                    }
                });
                responsiveProps = responsiveProps.map(prop => {
                    if (cssProps.some(cssProp => cssProp.name === prop.name)) // exist in b
                        return prop;
                    let cloneProp = Object.assign({}, prop);
                    cloneProp.value[i] = null;
                    return cloneProp;
                })
            }
            return responsiveProps;
        }
        else if (typeof value === "object") {
            let responsiveProps: ICssResponsiveProp[] = [];
            Object.keys(value).forEach((breakpoint: BreakpointType) => {
                let mapperObject = mapper(value[breakpoint],
                    _getValueAt<D1>(dependencies[0], breakpoint),
                    _getValueAt<D2>(dependencies[1], breakpoint)); // dependency need a default value
                let cssProps = mapperObject[value[breakpoint]];
                if (cssProps !== undefined) {
                    cssProps.forEach(cssProp => { // update existing responsive prop
                        let existedProp = responsiveProps.find(p => p.name === cssProp.name);
                        if (existedProp) {
                            existedProp.value[breakpoint] = cssProp.value;
                        }
                        else { // push new responsive prop value at this breakpoint
                            responsiveProps.push({
                                name: cssProp.name,
                                unit: cssProp.unit,
                                value: {
                                    [breakpoint]: cssProp.value
                                }
                            })
                        }
                    })
                }
            })
            return responsiveProps;
        }
        else {
            let responsiveProps: ICssResponsiveProp[] = [];
            sortKeys.forEach((breakpoint: BreakpointType) => {
                let mapperObject = mapper(value as I,
                    _getValueAt<D1>(dependencies[0], breakpoint),
                    _getValueAt<D2>(dependencies[1], breakpoint)); // dependency need a default value
                let cssProps = mapperObject[value as I];
                if (cssProps !== undefined) {
                    cssProps.forEach(cssProp => { // update existing responsive prop
                        let existedProp = responsiveProps.find(p => p.name === cssProp.name);
                        if (existedProp) {
                            existedProp.value[breakpoint] = cssProp.value;
                        }
                        else { // push new responsive prop value at this breakpoint
                            responsiveProps.push({
                                name: cssProp.name,
                                unit: cssProp.unit,
                                value: {
                                    [breakpoint]: cssProp.value
                                }
                            })
                        }
                    })
                }
            })
            return responsiveProps;
        }
    }

    return {
        getValueAt: _getValueAt,
        getBreakpointValues: _getBreakpointValues,
        transformBreakpointValues: _transformBreakpointValues,
        Union: {
            getResponsiveProps: _getResponsivePropsFromUnion,
            getResponsivePropsWithDependencies: _getResponsivePropsFromUnionWithDependencies
        }
    }
}