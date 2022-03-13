import { IMarginProps, IPaddingProps } from "@theme/style-props";
import { IStyledComponentProps } from "../base/types";

export interface IButtonProps extends IMarginProps, IPaddingProps {
    children: React.ReactNode;
}

export interface IStyledButtonProps extends IStyledComponentProps {

}