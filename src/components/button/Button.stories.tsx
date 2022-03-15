import { createTheme } from "@theme/provider";
import React from "react";
import { Button } from './Button';

export default {
    title: "Button",
};

// declare module "@theme/responsive/types" {
//     interface IBreakpointTypeOverride {
//         xs: false,
//         sm: false,
//         md: false,
//         lg: false,
//         xl: false,
//         mobile: true;
//         tablet: true;
//         desktop: true;
//     }
// }

export const Default = () => <Button
    margin={50}
    marginTop={{ xs: 100, md: 50, lg: 200 }}
    padding={[10, 20, 30]}
    _hover={{
        paddingTop: 100,
        paddingBottom: [50, 40],
        paddingLeft: { md: 100, lg: 200 },
        sx: {
            css: { sm: 'color: green;' }
        }
    }}
    sx={{
        css: ['color: red;', 'color: blue;']
    }}
> Button</Button>
