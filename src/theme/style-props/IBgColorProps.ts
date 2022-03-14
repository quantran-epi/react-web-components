import { ShortHandColorType } from '@theme/types';
import { ResponsiveValue } from "@theme/responsive/types";
import { LiteralUnion } from 'type-fest';

export interface IBgColorProps {
    bgColor?: ResponsiveValue<LiteralUnion<ShortHandColorType, string>>;
}