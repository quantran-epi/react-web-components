import { ShortHandColorType } from '@theme/types';
import { LiteralUnion } from 'type-fest';
import { IThemeSpecs } from "@theme/specs/abstract/IThemeSpecs";

export interface IColorFunction {
    resolve: (value: LiteralUnion<ShortHandColorType, string>) => string;
}

export const ColorFunction = (themeSpecs: IThemeSpecs): IColorFunction => {

    const resolve = (value: LiteralUnion<ShortHandColorType, string>): string => {
        switch (value) {
            case "primary": return themeSpecs.color.primary500;
            case "secondary": return themeSpecs.color.secondary500;
            case "success": return themeSpecs.color.success500;
            case "danger": return themeSpecs.color.danger500;
            case "warning": return themeSpecs.color.warning500;
        }
        if (Object.keys(themeSpecs.color).indexOf(value) > -1) return themeSpecs.color[value];
        return value;
    }

    return {
        resolve
    }
}