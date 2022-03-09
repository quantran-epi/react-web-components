import { IThemeSpacing } from './../base/IThemeSpacing';

export const ThemeSpacing: IThemeSpacing = {
    unit: "rem",
    scale: 0.25,
    generator: function (factor: [number, number, number?, number?] | number) {
        let self: IThemeSpacing = this;
        if (factor instanceof Array) {
            let spacing = [];
            if (factor[0] !== undefined) spacing.push(`${factor[0] * self.scale}${self.unit}`);
            if (factor[1] !== undefined) spacing.push(`${factor[1] * self.scale}${self.unit}`);
            if (factor[2] !== undefined) spacing.push(`${factor[2] * self.scale}${self.unit}`);
            if (factor[3] !== undefined) spacing.push(`${factor[3] * self.scale}${self.unit}`);
            return spacing.join(' ');
        }
        else return `${factor * self.scale}${self.unit}`;
    }
}