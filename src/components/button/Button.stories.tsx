import { createTheme } from "@theme/provider";
import React from "react";
import { Button } from './Button';

export default {
    title: "Button",
};

declare module "@theme/responsive/types" {
    interface IBreakpointTypeOverride {
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false,
        mobile: true;
        tablet: true;
        desktop: true;
    }
}

export const Default = () => <Button
    margin={[10, null, 20]}
    padding={{ tablet: 10, desktop: 20 }}
    className="test-button"
    style={{
        color: 'red'
    }}>Button</Button>
