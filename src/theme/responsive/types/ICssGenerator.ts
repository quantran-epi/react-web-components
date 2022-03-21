import { ResponsiveValue } from '@theme/responsive/types';
import { IBgColorProps, IBorderProps, IMarginProps, IPaddingProps, ISquareSizeProps } from "@theme/style-props/props";

export interface ICssPropsGeneratorItemCollection {
    margin?: IMarginProps;
    padding?: IPaddingProps;
    border?: IBorderProps;
    bgColor?: IBgColorProps;
    squareSize?: ISquareSizeProps;
    css?: ResponsiveValue<string>;
}

export interface ICssPropsGeneratorParams extends ICssPropsGeneratorItemCollection {
    _hover?: ICssPropsGeneratorItemCollection;
    _active?: ICssPropsGeneratorItemCollection;
    _focus?: ICssPropsGeneratorItemCollection;
}

export type ICssPropsGenerator = (params: ICssPropsGeneratorParams) => string;
