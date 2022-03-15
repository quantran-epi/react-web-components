import { ResponsiveValue } from '@theme/responsive/types';
import { IMarginProps, IPaddingProps } from "@theme/style-props";
import { PseudoSelectorType } from "./PseudoSelectorType";

export interface ICssPropsGeneratorGroupItemCollection {
    margin?: IMarginProps;
    padding?: IPaddingProps;
}

export interface ICssPropsGeneratorGroupParams extends ICssPropsGeneratorGroupItemCollection {
    _hover?: ICssPropsGeneratorGroupItemCollection;
}

export type ICssPropsGeneratorGroupItemFunctionCollection = {
    [key in keyof ICssPropsGeneratorGroupItemCollection]: (props: ICssPropsGeneratorGroupItemCollection[key], pseudo?: PseudoSelectorType) => string;
}

export interface ICssPropsGenerator extends ICssPropsGeneratorGroupItemFunctionCollection {
    group: (params: ICssPropsGeneratorGroupParams) => string;
}


// css string generator
export interface ICssStringGeneratorParams {
    css?: ResponsiveValue<string>;
    _hover?: {
        css?: ResponsiveValue<string>;
    }
}

export type ICssStringGenerator = (params: ICssStringGeneratorParams) => string;
