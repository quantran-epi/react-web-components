import { IThemeButton } from "@theme/specs/abstract/components";
import { ThemeColor } from "../ThemeColor";
import { ThemeFontSize } from "../ThemeFontSize";
import { ThemeShadow } from "../ThemeShadow";
import { ThemeSpacing } from "../ThemeSpacing";

export const ThemeButton: IThemeButton = {
    color: {
        primary: ThemeColor.primary500,
        secondary: ThemeColor.secondary500,
        success: ThemeColor.success500,
        danger: ThemeColor.danger500,
        warning: ThemeColor.warning500,
        default: ThemeColor.gray300
    },
    size: {
        sm: {
            fontSize: ThemeFontSize.sm,
            padding: ThemeSpacing.generator([1.25, 2.25])
        },
        md: {
            fontSize: ThemeFontSize.md,
            padding: ThemeSpacing.generator([1.5, 2.5])
        },
        lg: {
            fontSize: ThemeFontSize.lg,
            padding: ThemeSpacing.generator([1.75, 2.75])
        }
    },
    shape: {
        normal: { radius: 5 },
        rounded: { radius: "20%" },
        circle: { radius: "50%" }
    },
    shadow: ThemeShadow[3]
}