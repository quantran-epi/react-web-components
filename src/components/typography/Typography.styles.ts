import { IComponentStyleHook } from "../base/types";
import { ITypographyProps } from "./Typography.types";

interface IUseTypographyStyleProps extends Partial<ITypographyProps> {

}

interface IUseTypographyStyle extends IComponentStyleHook {

}

export const useTypographyStyle = (props?: IUseTypographyStyleProps): IUseTypographyStyle => {

    const _css = (): string => {
        return "";
    }

    return {
        css: _css()
    }
}