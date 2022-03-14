import { BreakpointType } from "./BreakpointType";

export type ResponsiveValue<T = string | number> = T
    | Array<T | null>
    | Partial<Record<BreakpointType, T>>;