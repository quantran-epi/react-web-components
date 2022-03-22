import React from 'react';
import { createGlobalStyle } from 'styled-components';

export interface IGlobalStyleProps {
    htmlFontSize: string;
}

export const GlobalStyle = createGlobalStyle<IGlobalStyleProps>`
    html {
        width: 100%;
        height: 100%;
        font-size: ${props => props.htmlFontSize};
    }
`