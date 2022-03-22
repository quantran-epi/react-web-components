import React, { useRef } from "react";
import { Typography } from './Typography';

export default {
    title: "Typography",
};

export const TypographyVariant = () => <React.Fragment>
    <Typography>Test</Typography>
    <Typography variant={"h1"}>Test</Typography>
    <Typography variant={"h2"}>Test</Typography>
    <Typography variant={"h3"}>Test</Typography>
    <Typography variant={"h4"}>Test</Typography>
    <Typography variant={"h5"}>Test</Typography>
    <Typography variant={"h6"}>Test</Typography>
    <Typography variant={"body1"}>Test</Typography>
    <Typography variant={"body2"}>Test</Typography>
    <Typography variant={"subtitle1"}>Test</Typography>
    <Typography variant={"subtitle2"}>Test</Typography>
    <Typography variant={"caption"}>Test</Typography>
</React.Fragment>