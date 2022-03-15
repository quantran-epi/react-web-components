import { ResponsiveValue } from "./ResponsiveValue";

export interface ICssResponsiveProp {
    name: string;
    unit?: string;
    value: ResponsiveValue;
}