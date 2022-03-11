// .storybook/preview.js

import React from 'react';

import { createTheme, ThemeProvider } from '../src/theme/provider';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export const parameters = {
    viewport: {
        viewports: INITIAL_VIEWPORTS,
    },
};

export const decorators = [
    (Story) => (
        <ThemeProvider>
            <Story />
        </ThemeProvider>
    ),
];

