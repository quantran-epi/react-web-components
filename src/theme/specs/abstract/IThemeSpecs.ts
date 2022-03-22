import { IThemeFontWeight } from './base/IThemeFontWeight';
import { IThemeShadow } from './base/IThemeShadow';
import { IThemeButton } from './components/IThemeButton';
import { IThemeBreakpoint } from './base/IThemeBreakpoint';
import { IThemeColor } from './base/IThemeColor';
import { IThemeSpacing } from './base/IThemeSpacing';
import { IThemeTypography } from './components';

interface IThemeComponentSpecs {
    button: IThemeButton;
    typography: IThemeTypography;
}

export interface IThemeSpecs {
    color: IThemeColor;
    fontWeight: IThemeFontWeight;
    spacing: IThemeSpacing;
    breakpoint: IThemeBreakpoint;
    shadow: IThemeShadow;
    components: IThemeComponentSpecs;
}
