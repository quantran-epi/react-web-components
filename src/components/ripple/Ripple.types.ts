import { ThemeColorPalette, ThemeShortHandColor } from '@theme/specs/abstract/base';
import { LiteralUnion } from 'type-fest';

export interface IRippleProps {
    color?: LiteralUnion<keyof ThemeShortHandColor | keyof ThemeColorPalette, string>;
}

export interface IRippleCircleStyledProps {
    show: boolean;
    color: string;
    left: string;
    top: string;
    size: string;
}