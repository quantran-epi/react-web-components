import { BreakpointType } from "./BreakpointType";

export type CssValueType = string | number;

export type ResponsiveValue = CssValueType
    | Array<CssValueType | null>
    | Partial<Record<BreakpointType, CssValueType>>;