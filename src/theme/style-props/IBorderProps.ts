import { ResponsiveValue } from "@theme/responsive/types";

export interface IBorderProps {
    border?: ResponsiveValue;
    borderWidth?: ResponsiveValue;
    borderBottomWidth?: ResponsiveValue;
    borderTopWidth?: ResponsiveValue;
    borderLeftWidth?: ResponsiveValue;
    borderRightWidth?: ResponsiveValue;
    borderStyle?: "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset";
    borderColor?: string;
}