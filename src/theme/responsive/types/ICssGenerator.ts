import { IMarginProps, IPaddingProps } from "@theme/style-props";
import { PseudoSelectorType } from "./PseudoSelectorType";

export interface ICssGeneratorGroupItemCollection {
    margin?: IMarginProps;
    padding?: IPaddingProps;
}

export interface ICssGeneratorGroupParams extends ICssGeneratorGroupItemCollection {
    _hover?: ICssGeneratorGroupItemCollection;
}

export type ICssGeneratorGroupItemFunctionCollection = {
    [key in keyof ICssGeneratorGroupItemCollection]: (props: ICssGeneratorGroupItemCollection[key], pseudo?: PseudoSelectorType) => string;
}

export interface ICssGenerator extends ICssGeneratorGroupItemFunctionCollection {
    group: (params: ICssGeneratorGroupParams) => string;
}