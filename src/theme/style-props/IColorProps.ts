import { ResponsiveValue } from "@theme/responsive/types";
import { LiteralUnion } from "type-fest";
import { ShortHandColorType } from "@theme/types";

export interface IColorProps {
    color?: ResponsiveValue<LiteralUnion<ShortHandColorType, string>>;
}