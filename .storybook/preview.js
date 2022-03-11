// .storybook/preview.js

import React from 'react';

import { createTheme, ThemeProvider } from '../src/theme/provider';

export const decorators = [
    (Story) => (
        <ThemeProvider value={createTheme(specs => ({
            color: {
                primary300: "violet"
            }
        }))}>
            <Story />
        </ThemeProvider>
    ),
];