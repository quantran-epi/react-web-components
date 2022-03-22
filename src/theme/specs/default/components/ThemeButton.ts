import { IThemeButton } from "@theme/specs/abstract/components";
import { ThemeColor } from "../ThemeColor";
import { ThemeShadow } from "../ThemeShadow";
import { ThemeSpacing } from "../ThemeSpacing";
import { ThemeTypography } from "./ThemeTypography";

export const ThemeButton: IThemeButton = {
    defaultProps: {
        size: "md",
        shape: "normal",
        type: "primary",
        disabledElevation: false,
        ripple: true,
        disabled: false
    },
    type: {
        primary: {
            bgColor: ThemeColor.shortHand.primary,
            fgColor: ThemeColor.contrastMapper["primary"],
            borderColor: "",
            borderStyle: "none",
            borderWidth: 0,
            ripple: {
                enabled: true,
                color: ThemeColor.palette.primary100
            },
            _hover: {
                bgColor: ThemeColor.palette.primary300,
                fgColor: ThemeColor.contrastMapper["primary"],
                borderColor: "",
                borderStyle: "none",
                borderWidth: 0,
            }
        },
        text: {
            bgColor: "transparent",
            fgColor: ThemeColor.palette.gray900,
            borderColor: "",
            borderStyle: "none",
            borderWidth: 0,
            ripple: {
                enabled: true,
                color: ThemeColor.palette.gray400
            },
            _hover: {
                bgColor: ThemeColor.palette.gray200,
                fgColor: ThemeColor.palette.gray900,
                borderColor: "",
                borderStyle: "none",
                borderWidth: 0,
            }
        },
        outlined: {
            bgColor: "transparent",
            fgColor: ThemeColor.palette.gray900,
            borderColor: ThemeColor.palette.gray500,
            borderStyle: "solid",
            borderWidth: 1,
            ripple: {
                enabled: true,
                color: ThemeColor.palette.gray200
            },
            _hover: {
                bgColor: ThemeColor.palette.gray50,
                fgColor: ThemeColor.palette.gray900,
                borderColor: ThemeColor.palette.gray900,
                borderStyle: "solid",
                borderWidth: 1,
            }
        },
        dashed: {
            bgColor: "transparent",
            fgColor: ThemeColor.palette.gray900,
            borderColor: ThemeColor.palette.gray500,
            borderStyle: "dashed",
            borderWidth: 1,
            ripple: {
                enabled: true,
                color: ThemeColor.palette.gray200
            },
            _hover: {
                bgColor: ThemeColor.palette.gray50,
                fgColor: ThemeColor.palette.gray900,
                borderColor: ThemeColor.palette.gray900,
                borderStyle: "dashed",
                borderWidth: 1,
            }
        },
        link: {
            bgColor: "transparent",
            fgColor: ThemeColor.component.link,
            borderColor: "",
            borderStyle: "none",
            borderWidth: 0,
            ripple: {
                enabled: false
            },
            _hover: {
                bgColor: "transparent",
                fgColor: ThemeColor.component.linkHover,
                borderColor: "",
                borderStyle: "none",
                borderWidth: 0,
            }
        }
    },
    size: {
        sm: {
            fontSize: ThemeTypography.components.button.fontSize,
            padding: ThemeSpacing.generator([1.25, 2.25])
        },
        md: {
            fontSize: ThemeTypography.components.button.fontSize,
            padding: ThemeSpacing.generator([2, 3])
        },
        lg: {
            fontSize: ThemeTypography.components.button.fontSize,
            padding: ThemeSpacing.generator([2.75, 3.75])
        }
    },
    shape: {
        normal: { radius: 5 },
        rounded: { radius: "40px" },
        circle: { radius: "50%" }
    },
    shadow: {
        value: ThemeShadow[2],
        _hover: {
            value: ThemeShadow[3]
        }
    }
}