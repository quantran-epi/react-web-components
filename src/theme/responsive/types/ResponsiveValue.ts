import { BreakpointType } from "./BreakpointType";

type ValueType = string | number;

export type ResponsiveValue = ValueType
    | [ValueType, ValueType?, ValueType?, ValueType?, ValueType?]
    | Partial<Record<BreakpointType, ValueType>>;