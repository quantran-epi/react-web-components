import { IThemeSpecs } from '@theme/specs/abstract/IThemeSpecs';
import DefaultThemeSpecs from '@theme/specs/default';
import React, { FunctionComponent, useState } from 'react';

interface IThemeProviderProps {
    value?: IThemeSpecs;
}

export type SwitchThemeHandler<T extends IThemeSpecs = IThemeSpecs> = (theme: T) => void;

export interface IThemeContextData<T extends IThemeSpecs = IThemeSpecs> {
    theme: T;
    switchTheme: SwitchThemeHandler<T>;
}

const defaultThemeContextData: IThemeContextData = {
    theme: DefaultThemeSpecs,
    switchTheme: () => { }
}

export const ThemeContext = React.createContext<IThemeContextData<any>>(defaultThemeContextData);

export const ThemeProvider: FunctionComponent<IThemeProviderProps> = ({
    children,
    value
}) => {
    const _value = (): IThemeSpecs => {
        return value || DefaultThemeSpecs;
    }

    const _switchTheme = (theme: IThemeSpecs): void => {
        _setContext({
            ..._context,
            theme: theme
        })
    }

    const [_context, _setContext] = useState<IThemeContextData>({
        theme: _value(),
        switchTheme: _switchTheme
    });

    return <ThemeContext.Provider value={_context}>
        {children}
    </ThemeContext.Provider>;
}