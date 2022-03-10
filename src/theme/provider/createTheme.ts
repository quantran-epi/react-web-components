import { IThemeSpecs } from "@theme/specs/abstract/IThemeSpecs";
import DefaultThemeSpecs from "@theme/specs/default";
import { PartialDeep } from 'type-fest';
import { merge } from 'lodash';

export type ICreateThemeProps<T extends IThemeSpecs = IThemeSpecs> = (defaultThemeSpecs: IThemeSpecs) => {
    [K in keyof T]?: PartialDeep<T[K]>;
};

export const createTheme = <T extends IThemeSpecs = IThemeSpecs>(propsFunc: ICreateThemeProps<T>): T => {
    let {
        color,
        spacing,
        breakpoint,
        fontFamily,
        fontSize,
        components,
        ...others
    } = propsFunc(DefaultThemeSpecs);

    let _color = Object.assign({}, DefaultThemeSpecs.color, color);
    let _spacing = Object.assign({}, DefaultThemeSpecs.spacing, spacing);
    let _fontFamily = Object.assign({}, DefaultThemeSpecs.fontFamily, fontFamily);
    let _fontSize = Object.assign({}, DefaultThemeSpecs.fontSize, fontSize);
    let _breakpoint = Object.assign({}, DefaultThemeSpecs.breakpoint, breakpoint);

    let _components = merge(DefaultThemeSpecs.components, components);

    return {
        color: _color,
        breakpoint: _breakpoint,
        fontFamily: _fontFamily,
        fontSize: _fontSize,
        spacing: _spacing,
        components: _components,
        ...others
    } as unknown as T
}