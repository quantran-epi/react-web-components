import { ResponsiveValue } from "@theme/responsive/types";
import { ButtonColor, ButtonShape, ButtonSize, ButtonType } from "@theme/specs/abstract/components";
import { IBorderProps, IClassNameProps, IHoverProps, IMarginProps, IPaddingProps, ISystemOverrideProps } from "@theme/style-props";
import { LiteralUnion } from "type-fest";
import { CommonOmitHtmlAttribute, IStyledComponentProps } from "../base/types";

export type ButtonHtmlType = "submit" | "button" | "reset";
export interface IButtonStyleProps extends
    ISystemOverrideProps,
    IMarginProps,
    IPaddingProps,
    IBorderProps,
    IHoverProps<IMarginProps
    & IPaddingProps
    & IBorderProps
    & ISystemOverrideProps> {
    size?: ResponsiveValue<ButtonSize>;
    color?: ResponsiveValue<LiteralUnion<ButtonColor, string>>;
    shape?: ResponsiveValue<ButtonShape>;
    type?: ResponsiveValue<ButtonType>;
}

export type AnchorButtonProps = {
    href: string;
    target?: string, // convert to anchor's target type later
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & IButtonStyleProps & Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick' | CommonOmitHtmlAttribute>;

export type NativeButtonProps = {
    htmlType?: ButtonHtmlType;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & IButtonStyleProps & Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick' | CommonOmitHtmlAttribute>;

export interface IButtonProps extends
    Partial<NativeButtonProps & AnchorButtonProps>,
    IClassNameProps {
    children: React.ReactNode;
}

export interface IStyledButtonProps extends IStyledComponentProps {

}