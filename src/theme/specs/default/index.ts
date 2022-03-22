import { ThemeSpacing } from './ThemeSpacing';
import { ThemeBreakpoint } from './ThemeBreakpoint';
import { ThemeColor } from './ThemeColor';
import { ThemeShadow } from './ThemeShadow';
import { ThemeFontWeight } from './ThemeFontWeight';

import { ThemeButton } from './components/ThemeButton';
import { IThemeSpecs } from '@theme/specs/abstract/IThemeSpecs';
import { ThemeTypography } from './components/ThemeTypography';

const DefaultThemeSpecs: IThemeSpecs = {
    color: ThemeColor,
    fontWeight: ThemeFontWeight,
    breakpoint: ThemeBreakpoint,
    spacing: ThemeSpacing,
    shadow: ThemeShadow,

    components: {
        button: ThemeButton,
        typography: ThemeTypography
    }
}

export default DefaultThemeSpecs;