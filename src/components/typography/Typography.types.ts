import { ITypographyStyleProps } from "@theme/specs/abstract/components";
import { IStyledComponentProps } from "../base/types";

export interface ITypographyProps extends ITypographyStyleProps {
    children: string;
    innerRef?: React.RefObject<HTMLElement>;
}

export interface IStyledTypographyProps extends IStyledComponentProps {

}