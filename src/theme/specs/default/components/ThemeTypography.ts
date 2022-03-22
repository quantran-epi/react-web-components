import { IThemeTypography } from "@theme/specs/abstract/components";
import { ThemeFontWeight } from "../ThemeFontWeight";

export const ThemeTypography: IThemeTypography = {
    base: {
        htmlFontSize: "16px"
    },
    components: {
        h1: {
            fontFamily: `"Helvetica Neue",Arial,sans-serif`,
            fontSize: "6rem",
            fontWeight: ThemeFontWeight.thin,
            letterSpacing: "-0.01562em",
            lineHeight: 1.167
        },
        h2: {
            fontFamily: `"Helvetica Neue",Arial,sans-serif`,
            fontSize: "3.75rem",
            fontWeight: ThemeFontWeight.thin,
            letterSpacing: "-0.00833em",
            lineHeight: 1.2
        },
        h3: {
            fontFamily: `"Helvetica Neue",Arial,sans-serif`,
            fontSize: "3rem",
            fontWeight: ThemeFontWeight.light,
            letterSpacing: "0em",
            lineHeight: 1.167
        },
        h4: {
            fontFamily: `"Helvetica Neue",Arial,sans-serif`,
            fontSize: "2.215rem",
            fontWeight: ThemeFontWeight.light,
            letterSpacing: "0.00735em",
            lineHeight: 1.235
        },
        h5: {
            fontFamily: `"Helvetica Neue",Arial,sans-serif`,
            fontSize: "1.5rem",
            fontWeight: ThemeFontWeight.light,
            letterSpacing: "0em",
            lineHeight: 1.334
        },
        h6: {
            fontFamily: `"Helvetica Neue",Arial,sans-serif`,
            fontSize: "3.75rem",
            fontWeight: ThemeFontWeight.normal,
            letterSpacing: "-0.01562em",
            lineHeight: 1.167
        },
        body1: {
            fontFamily: `"Helvetica Neue",Arial,sans-serif`,
            fontSize: "1rem",
            fontWeight: ThemeFontWeight.light,
            letterSpacing: "0.00938em",
            lineHeight: 1.5
        },
        body2: {
            fontFamily: `"Helvetica Neue",Arial,sans-serif`,
            fontSize: "0.875rem",
            fontWeight: ThemeFontWeight.light,
            letterSpacing: "0.01071em",
            lineHeight: 1.43
        },
        subtitle1: {
            fontFamily: `"Helvetica Neue",Arial,sans-serif`,
            fontSize: "1rem",
            fontWeight: ThemeFontWeight.light,
            letterSpacing: "0.00938em",
            lineHeight: 1.75
        },
        subtitle2: {
            fontFamily: `"Helvetica Neue",Arial,sans-serif`,
            fontSize: "0.875rem",
            fontWeight: ThemeFontWeight.light,
            letterSpacing: "0.00714em",
            lineHeight: 1.57
        },
        button: {
            fontFamily: `"Helvetica Neue",Arial,sans-serif`,
            fontSize: "0.8125rem",
            fontWeight: ThemeFontWeight.normal,
            letterSpacing: "0.02857em",
            lineHeight: 1.75
        },
        caption: {
            fontFamily: `"Helvetica Neue",Arial,sans-serif`,
            fontSize: "0.75rem",
            fontWeight: ThemeFontWeight.light,
            letterSpacing: "0.03333em",
            lineHeight: 1.66
        }
    }
}