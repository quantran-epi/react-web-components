import { useTheme } from '@theme/provider';
import { IMarginProps } from "@theme/style-props";
import { ResponsiveValue } from '../types';
import { useMediaQuery } from './useMediaQuery';

interface IUseResponsiveCssProps {
}

interface IUseResponsiveCss {
    fromMarginPropsToCss: (props: IMarginProps) => string;
}

export const useResponsiveCss = (props?: IUseResponsiveCssProps): IUseResponsiveCss => {
    const { theme } = useTheme();
    const { above, between, sortKeys } = useMediaQuery({
        breakpoints: theme.breakpoint.values,
        step: theme.breakpoint.step
    });

    const _cssProperty = (propName: string, propValue: ResponsiveValue, unit: string = 'px'): string => {
        if (typeof propValue === "string")
            return `${propName}: ${propValue}`;
        if (typeof propValue === "number")
            return `${propName}: ${propValue}${unit}`;

        if (propValue instanceof Array) {
            let css = [];
            let i = 0;
            while (i < 5) {
                if (propValue[i] === undefined) {
                    css.push(`${above(sortKeys[i])} {
                        ${propName}: ${propValue[i - 1]}${typeof propValue[i - 1] === "number" ? unit : ""};
                    }`);
                    break;
                }

                if (i === 4) {
                    css.push(`${above(sortKeys[i])} {
                        ${propName}: ${propValue[i]}${typeof propValue[i] === "number" ? unit : ""};
                    }`);
                    break;
                }

                css.push(`${between(sortKeys[i], sortKeys[i + 1])} {
                    ${propName}: ${propValue[i]}${typeof propValue[i] === "number" ? unit : ""};
                }`);
                i++;
            }
            return css.join("");
        }
    }

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
        let o = [];
        if (margin !== undefined) o.push(_cssProperty("margin", margin));
        if (marginHorizontal !== undefined) {
            o.push(_cssProperty("margin-left", marginHorizontal));
            o.push(_cssProperty("margin-right", marginHorizontal));
        }
        if (marginVertical !== undefined) {
            o.push(_cssProperty("margin-top", marginVertical));
            o.push(_cssProperty("margin-bottom", marginVertical));
        }
        if (marginBottom !== undefined) o.push(_cssProperty("margin-bottom", marginBottom));
        if (marginTop !== undefined) o.push(_cssProperty("margin-top", marginTop));
        if (marginLeft !== undefined) o.push(_cssProperty("margin-left", marginLeft));
        if (marginRight !== undefined) o.push(_cssProperty("margin-right", marginRight));

        return o.join("");
    }

    return {
        fromMarginPropsToCss
    }
}