import { IButtonStyleProps } from "@theme/specs/abstract/components";
import { IClassNameProps } from "@theme/style-props/props";
import { CommonOmitHtmlAttribute, IStyledComponentProps } from "../base/types";

export type ButtonHtmlType = "submit" | "button" | "reset";

type NativeButtonProps = Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick' | "color" | CommonOmitHtmlAttribute>;

export type AnchorButtonProps = {
    href: string;
    target?: string, // convert to anchor's target type later
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & IButtonStyleProps;

export type NormalButtonProps = {
    htmlType?: ButtonHtmlType;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & IButtonStyleProps;

export interface IButtonProps extends
    Partial<NormalButtonProps & AnchorButtonProps>,
    IClassNameProps {
    children: React.ReactNode;
    native?: NativeButtonProps;
    innerRef?: React.RefObject<HTMLButtonElement>;
}

export interface IStyledButtonProps extends IStyledComponentProps {

}