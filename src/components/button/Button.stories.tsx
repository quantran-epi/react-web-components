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
    shape={["rounded", "circle", "normal"]}
    href="test href"
    onClick={() => {alert('dada')}}
    title="button title"
    id="button_id"> Button</Button>
