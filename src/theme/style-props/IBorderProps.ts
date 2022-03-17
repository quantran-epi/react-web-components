import { ResponsiveValue } from "@theme/responsive/types";
import { ThemeColorPalette, ThemeShortHandColor } from "@theme/specs/abstract/base";
import { LiteralUnion } from "type-fest";

export type BorderStyle = "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset";

export interface IBorderProps {
    border?: ResponsiveValue;
    borderWidth?: ResponsiveValue;
    borderBottomWidth?: ResponsiveValue;
    borderTopWidth?: ResponsiveValue;
    borderLeftWidth?: ResponsiveValue;
    borderRightWidth?: ResponsiveValue;
    borderStyle?: ResponsiveValue<BorderStyle>;
    borderColor?: ResponsiveValue<LiteralUnion<keyof ThemeShortHandColor | keyof ThemeColorPalette, string>>;
}