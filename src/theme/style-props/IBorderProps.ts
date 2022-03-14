import { ShortHandColorType } from '@theme/types';
import { ResponsiveValue } from "@theme/responsive/types";
import { LiteralUnion } from "type-fest";

export interface IBorderProps {
    border?: ResponsiveValue;
    borderWidth?: ResponsiveValue;
    borderBottomWidth?: ResponsiveValue;
    borderTopWidth?: ResponsiveValue;
    borderLeftWidth?: ResponsiveValue;
    borderRightWidth?: ResponsiveValue;
    borderStyle?: ResponsiveValue<"none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset">;
    borderColor?: ResponsiveValue<LiteralUnion<ShortHandColorType, string>>;
}