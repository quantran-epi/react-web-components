import { FilteredKeys } from "@theme/types";
import { Merge } from "type-fest";

interface IBreakpointTypeDefault {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
}

export interface IBreakpointTypeOverride { }

type BreakpointTypeMerge = Merge<IBreakpointTypeDefault, IBreakpointTypeOverride>;

export type BreakpointType = FilteredKeys<BreakpointTypeMerge, true>;
export type BreakpointValueObject = {
    [key in BreakpointType]: number;
}
