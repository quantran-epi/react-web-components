import { IButtonStyleProps } from "@theme/specs/abstract/components";
import { IClassNameProps } from "@theme/style-props";
import { CommonOmitHtmlAttribute, IStyledComponentProps } from "../base/types";

export type ButtonHtmlType = "submit" | "button" | "reset";

export type AnchorButtonProps = {
    href: string;
    target?: string, // convert to anchor's target type later
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & IButtonStyleProps & Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick' | "color" | CommonOmitHtmlAttribute>;

export type NativeButtonProps = {
    htmlType?: ButtonHtmlType;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & IButtonStyleProps & Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick' | "color" | CommonOmitHtmlAttribute>;

export interface IButtonProps extends
    Partial<NativeButtonProps & AnchorButtonProps>,
    IClassNameProps {
    children: React.ReactNode;
}

export interface IStyledButtonProps extends IStyledComponentProps {

}