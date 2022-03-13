import { BreakpointType } from "./BreakpointType";

export type CssValueType = string | number;

export type ResponsiveValue = CssValueType
    | [CssValueType, CssValueType?, CssValueType?, CssValueType?, CssValueType?]
    | Partial<Record<BreakpointType, CssValueType>>;