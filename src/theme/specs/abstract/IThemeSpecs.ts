import { IThemeButton } from './components/IThemeButton';
import { IThemeBreakpoint } from './base/IThemeBreakpoint';
import { IThemeColor } from './base/IThemeColor';
import { IThemeFontFamily } from './base/IThemeFontFamily';
import { IThemeFontSize } from './base/IThemeFontSize';
import { IThemeSpacing } from './base/IThemeSpacing';

interface IThemeComponentSpecs {
    button: IThemeButton;
}

export interface IThemeSpecs {
    color: IThemeColor;
    fontSize: IThemeFontSize;
    fontFamily: IThemeFontFamily;
    spacing: IThemeSpacing;
    breakpoint: IThemeBreakpoint;
    components: IThemeComponentSpecs;
}
