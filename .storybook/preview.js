// .storybook/preview.js

import React from 'react';

import { createTheme, ThemeProvider } from '../src/theme/provider';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export const parameters = {
    viewport: {
        viewports: INITIAL_VIEWPORTS,
    },
};

const theme = createTheme(specs => ({
    breakpoint: {
        values: {
            mobile: 0,
            tablet: 768,
            desktop: 1000
        }
    }
}))
console.log("create theme", theme);

export const decorators = [
    (Story) => (
        <ThemeProvider value={theme}>
            <Story />
        </ThemeProvider>
    ),
];

