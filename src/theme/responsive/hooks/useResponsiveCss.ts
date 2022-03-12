import { useTheme } from '@theme/provider';
import { IMarginProps } from "@theme/style-props";
import { useMediaQuery } from './useMediaQuery';

interface IUseResponsiveCssProps {
}

interface IUseResponsiveCss {
    fromMarginPropsToCss: (props: IMarginProps) => string;
}

export const useResponsiveCss = (props?: IUseResponsiveCssProps): IUseResponsiveCss => {
    const { theme } = useTheme();
    const { } = useMediaQuery({
        breakpoints: theme.breakpoint.values,
        step: theme.breakpoint.step
    });

    const fromMarginPropsToCss = (props: IMarginProps) => {
        let {
            margin,
            marginBottom,
            marginHorizontal,
            marginLeft,
            marginRight,
            marginTop,
            marginVertical
        } = props;

        if (typeof margin === "string" || typeof margin === "number") {
            return `
                margin: ${margin};
            `;
        }
        else if (margin instanceof Array) {
            `${}`
        }

        return "";
    }

    return {
        fromMarginPropsToCss
    }
}