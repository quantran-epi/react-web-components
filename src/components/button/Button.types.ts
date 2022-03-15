import { ResponsiveValue } from "@theme/responsive/types";
import { ButtonColor, ButtonShape, ButtonSize, ButtonType } from "@theme/specs/abstract/components";
import { IBorderProps, IClassNameProps, IHoverProps, IMarginProps, IPaddingProps, ISystemOverrideProps } from "@theme/style-props";
import { LiteralUnion } from "type-fest";
import { IStyledComponentProps } from "../base/types";

export interface IButtonProps
    extends
    IMarginProps,
    IPaddingProps,
    IBorderProps,
    IClassNameProps,
    ISystemOverrideProps,
    IHoverProps<IMarginProps
    & IPaddingProps
    & IBorderProps
    & ISystemOverrideProps> {
    children: React.ReactNode;
    size?: ResponsiveValue<ButtonSize>;
    color?: LiteralUnion<ButtonColor, string>;
    shape?: ButtonShape;
    type?: ButtonType;
}

export interface IStyledButtonProps extends IStyledComponentProps {

}