import { IThemeSpecs } from "@theme/specs/abstract/IThemeSpecs";
import DefaultThemeSpecs from "@theme/specs/default";
import { PartialDeep } from 'type-fest';
import { merge } from 'lodash';
import { IThemeBreakpoint } from "@theme/specs/abstract/base";

export type ICreateThemeProps<T extends IThemeSpecs = IThemeSpecs> = (defaultThemeSpecs: IThemeSpecs) => {
    [K in keyof T]?: T[K] extends IThemeBreakpoint ? Partial<T[K]>
    : PartialDeep<T[K]>;
};

export const createTheme = <T extends IThemeSpecs = IThemeSpecs>(propsFunc: ICreateThemeProps<T>): T => {
    let {
        color,
        spacing,
        breakpoint,
        fontWeight,
        shadow,
        components,
        ...others
    } = propsFunc(DefaultThemeSpecs);

    let _color = merge({}, DefaultThemeSpecs.color, color);
    let _spacing = merge({}, DefaultThemeSpecs.spacing, spacing);
    let _fontWeight = merge({}, DefaultThemeSpecs.fontWeight, fontWeight);
    let _breakpoint = Object.assign({}, DefaultThemeSpecs.breakpoint, breakpoint);
    let _shadow = merge({}, DefaultThemeSpecs.shadow, shadow);

    let _components = merge({}, DefaultThemeSpecs.components, components);

    return {
        color: _color,
        breakpoint: _breakpoint,
        fontWeight: _fontWeight,
        spacing: _spacing,
        shadow: _shadow,
        components: _components,
        ...others
    } as unknown as T
}