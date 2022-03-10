import { ThemeFontSize } from './ThemeFontSize';
import { ThemeSpacing } from './ThemeSpacing';
import { ThemeBreakpoint } from './ThemeBreakpoint';
import { ThemeFontFamily } from './ThemeFontFamily';
import { ThemeColor } from './ThemeColor';

import { ThemeButton } from './components/ThemeButton';
import { IThemeSpecs } from '@theme/specs/abstract/IThemeSpecs';

const DefaultThemeSpecs: IThemeSpecs = {
    color: ThemeColor,
    fontFamily: ThemeFontFamily,
    fontSize: ThemeFontSize,
    breakpoint: ThemeBreakpoint,
    spacing: ThemeSpacing,
    components: {
        button: ThemeButton
    }
}

export default DefaultThemeSpecs;