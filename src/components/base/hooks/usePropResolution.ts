import { IActiveProps, IAfterProps, IBeforeProps, IBgColorProps, IBorderProps, IClassNameProps, IColorProps, IFocusProps, IHoverProps, IMarginProps, IPaddingProps, ISquareSizeProps, ISystemOverrideProps } from "@theme/style-props"

interface IUsePropResolution {
    getStyleProps: (props: any) => any;
    omitProps: (source: any, omitProps: any) => any;
}

const PADDING: Array<keyof IPaddingProps> = [
    "padding",
    "paddingBottom",
    "paddingHorizontal",
    "paddingLeft",
    "paddingRight",
    "paddingTop",
    "paddingVertical",
]
const MARGIN: Array<keyof IMarginProps> = [
    "margin",
    "marginBottom",
    "marginHorizontal",
    "marginLeft",
    "marginRight",
    "marginTop",
    "marginVertical",
]
const BORDER: Array<keyof IBorderProps> = [
    "border",
    "borderBottomWidth",
    "borderColor",
    "borderLeftWidth",
    "borderRightWidth",
    "borderStyle",
    "borderTopWidth",
    "borderWidth"
]
const COLOR: Array<keyof IColorProps> = [
    "color"
]
const BG_COLOR: Array<keyof IBgColorProps> = [
    "bgColor"
]
const CLASS_NAME: Array<keyof IClassNameProps> = [
    "className"
]
const SQUARE_SIZE: Array<keyof ISquareSizeProps> = [
    "width",
    "height"
]
const SYSTEM_OVERRIDE: Array<keyof ISystemOverrideProps> = [
    "sx"
]
const _HOVER: Array<keyof IHoverProps<any>> = [
    "_hover"
]
const _ACTIVE: Array<keyof IActiveProps<any>> = [
    "_active"
]
const _AFTER: Array<keyof IAfterProps<any>> = [
    "_after"
]
const _BEFORE: Array<keyof IBeforeProps<any>> = [
    "_before"
]
const _FOCUS: Array<keyof IFocusProps<any>> = [
    "_focus"
]

const STYLE_PROPS = [...PADDING, ...MARGIN, ...BORDER, ...COLOR, ...BG_COLOR, ...CLASS_NAME, ...SQUARE_SIZE, ...SYSTEM_OVERRIDE];

export const usePropResolution = (): IUsePropResolution => {

    const _getStyleProps = (props: any) => {
        let styleProps = {};
        Object.keys(props).forEach(key => {
            if (STYLE_PROPS.includes(key as any)) styleProps[key] = props[key];
        })
        return styleProps;
    }

    const _omitProps = (source, omitProps): any => {
        let result = {};
        let omitedKeys = Object.keys(omitProps);
        Object.keys(source).forEach(key => {
            if (!omitedKeys.includes(key)) result[key] = source[key];
        })
        return result;
    }

    return {
        getStyleProps: _getStyleProps,
        omitProps: _omitProps
    }
}