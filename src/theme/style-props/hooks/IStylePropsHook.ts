import { ICssResponsiveProp } from "@theme/responsive/types";

export interface IStylePropsHook<T> {
    getResponsiveProps: (props?: T) => ICssResponsiveProp[];
}