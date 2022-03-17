import { ResponsiveValue } from "@theme/responsive/types";
import { ButtonShape, ButtonSize, ButtonType } from "@theme/specs/abstract/components";
import { IBgColorProps, IBorderProps, IClassNameProps, IHoverProps, IMarginProps, IPaddingProps, ISystemOverrideProps } from "@theme/style-props";
import { CommonOmitHtmlAttribute, IStyledComponentProps } from "../base/types";

export type ButtonHtmlType = "submit" | "button" | "reset";
export interface IButtonStyleProps extends
    ISystemOverrideProps,
    IMarginProps,
    IPaddingProps,
    IBorderProps,
    IBgColorProps,
    IHoverProps<IMarginProps
    & IPaddingProps
    & IBorderProps
    & IBgColorProps
    & ISystemOverrideProps> {
    size?: ResponsiveValue<ButtonSize>;
    shape?: ResponsiveValue<ButtonShape>;
    type?: ResponsiveValue<ButtonType>;
}

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