import { LiteralUnion } from 'type-fest';
import { IThemeSpecs } from "@theme/specs/abstract/IThemeSpecs";
import { ThemeColorPalette, ThemeShortHandColor } from '@theme/specs/abstract/base';

interface ContrastColor {
    color: string;
    contrastText: string;
}

export interface IColorFunction {
    resolve: (value: LiteralUnion<keyof ThemeShortHandColor | keyof ThemeColorPalette, string>) => string;
    resolveContrast: <TMapperKey extends string>(value: TMapperKey,
        mapper: Record<TMapperKey, string>) => ContrastColor;
}

export const ColorFunction = (themeSpecs: IThemeSpecs): IColorFunction => {

    const resolve = (value: LiteralUnion<keyof ThemeShortHandColor | keyof ThemeColorPalette, string>): string => {
        switch (value) {
            case "primary": return themeSpecs.color.shortHand.primary;
            case "secondary": return themeSpecs.color.shortHand.secondary;
            case "success": return themeSpecs.color.shortHand.success;
            case "danger": return themeSpecs.color.shortHand.danger;
            case "warning": return themeSpecs.color.shortHand.warning;
            case "gray": return themeSpecs.color.shortHand.gray;
        }
        if (Object.keys(themeSpecs.color.palette).indexOf(value) > -1) return themeSpecs.color.palette[value];
        return value;
    }

    const resolveContrast = <TMapperKey extends string>(value: TMapperKey,
        mapper: Record<TMapperKey, string>): ContrastColor => {
        const contrastKeys = Object.keys(mapper);

        if (contrastKeys.includes(value)) // predefined keys
            return {
                color: resolve(value),
                contrastText: mapper[value]
            }

        // custom color value => handle later
        return {
            color: value,
            contrastText: ""
        }
    }

    return {
        resolve,
        resolveContrast
    }
}