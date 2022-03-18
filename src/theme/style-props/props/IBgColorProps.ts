import { ResponsiveValue } from "@theme/responsive/types";
import { ThemeColorPalette, ThemeShortHandColor } from "@theme/specs/abstract/base";
import { LiteralUnion } from 'type-fest';

export interface IBgColorProps {
    bgColor?: ResponsiveValue<LiteralUnion<keyof ThemeShortHandColor | keyof ThemeColorPalette, string>>;
}