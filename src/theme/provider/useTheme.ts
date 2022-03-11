import { IThemeSpecs } from "@theme/specs/abstract/IThemeSpecs";
import { useContext } from "react"
import { IThemeContextData, SwitchThemeHandler, ThemeContext } from "./ThemeProvider";

interface IUseTheme<T extends IThemeSpecs = IThemeSpecs> {
    theme: T;
    switchTheme: SwitchThemeHandler<T>;
}

interface IUseThemeProps<T extends IThemeSpecs = IThemeSpecs> {

}

export const useTheme = <T extends IThemeSpecs = IThemeSpecs>(props?: IUseThemeProps<T>): IUseTheme<T> => {
    const { theme, switchTheme } = useContext<IThemeContextData<T>>(ThemeContext);

    return {
        theme: theme,
        switchTheme: switchTheme
    }
}