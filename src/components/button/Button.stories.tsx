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

export const ButtonSize = () => <React.Fragment>
    <Button size={"sm"} marginHorizontal={10} _hover={{
        sx: {
            css: `color: red;`
        }
    }}>Small Button</Button>
    <Button marginHorizontal={10}>Medium Button</Button>
    <Button size={"lg"} marginHorizontal={10}>Large Button</Button>
    <Button size={["sm", "md", "lg"]}>Button Responsive</Button>
</React.Fragment>

export const ButtonType = () => <React.Fragment>
    <Button marginHorizontal={10}>Default Button</Button>
    <Button type={"dashed"} marginHorizontal={10}>Dashed Button</Button>
    <Button type={"outlined"} marginHorizontal={10}>Outlined Button</Button>
    <Button type={"text"} marginHorizontal={10}>Text Button</Button>
    <Button type={"link"} marginHorizontal={10}>Link Button</Button>
    <Button type={["primary", "outlined", "dashed", "link", "text"]}>Button Responsive</Button>
</React.Fragment>

export const ButtonShape = () => <React.Fragment>
    <Button marginHorizontal={10}>Normal Button</Button>
    <Button shape={"rounded"} marginHorizontal={10}>Rounded Button</Button>
    <Button shape={"circle"} marginHorizontal={10}>Circle Button</Button>
    <Button shape={["normal", "circle", "rounded"]} marginHorizontal={10}>Button Responsive</Button>
</React.Fragment>

