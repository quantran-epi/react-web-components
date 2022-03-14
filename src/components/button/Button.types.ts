import { IColorProps, IHoverProps, IMarginProps, IPaddingProps } from "@theme/style-props";
import { MergeExclusive } from "type-fest";
import { IStylableProps, IStyledComponentProps } from "../base/types";

export interface IButtonProps
    extends IStylableProps,
    IMarginProps,
    IPaddingProps,
    IColorProps,
    IHoverProps<MergeExclusive<IMarginProps, IPaddingProps>> {
    children: React.ReactNode;
}

export interface IStyledButtonProps extends IStyledComponentProps {

}