import { IColorFunction, ColorFunction } from '@theme/functions';
import { IThemeSpecs } from "@theme/specs/abstract/IThemeSpecs";
import { useContext } from "react"
import { IThemeContextData, SwitchThemeHandler, ThemeContext } from "./ThemeProvider";

interface IUseThemeContext<T extends IThemeSpecs = IThemeSpecs> {
    specs: T;
    functions: {
        color: IColorFunction;
    }
}

interface IUseTheme<T extends IThemeSpecs = IThemeSpecs> {
    theme: IUseThemeContext<T>;
    switchTheme: SwitchThemeHandler<T>;
}

interface IUseThemeProps<T extends IThemeSpecs = IThemeSpecs> {

}

export const useTheme = <T extends IThemeSpecs = IThemeSpecs>(props?: IUseThemeProps<T>): IUseTheme<T> => {
    const { theme: themeSpecs, switchTheme } = useContext<IThemeContextData<T>>(ThemeContext);

    return {
        theme: {
            specs: themeSpecs,
            functions: {
                color: ColorFunction(themeSpecs)
            }
        },
        switchTheme: switchTheme
    }
}