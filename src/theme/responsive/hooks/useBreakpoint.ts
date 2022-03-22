import { useTheme } from "@theme/provider";
import { BreakpointType, BreakpointValueObject } from "../types"

interface IUseBreakpointProps {

}

interface IUseBreakpoint {
    screenSize: BreakpointType;
    sortBreakpointsValues: (breakpoints: BreakpointValueObject) => {};
}

export const useBreakpoint = (props?: IUseBreakpointProps): IUseBreakpoint => {
    const _sortBreakpointsValues = (breakpoints: BreakpointValueObject) => {
        const breakpointsAsArray = Object.keys(breakpoints).map((key) => ({ key, val: breakpoints[key] })) || [];
        // Sort in ascending order
        breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val);
        return breakpointsAsArray.reduce((acc, obj) => {
            return { ...acc, [obj.key]: obj.val };
        }, {});
    };

    const { theme } = useTheme();
    const _sortedValues = _sortBreakpointsValues(theme.specs.breakpoint.values);
    const keys = Object.keys(_sortedValues) as BreakpointType[];

    const _getScreenSize = (): BreakpointType => {
        let _document = document.getElementsByTagName('html')[0];
        let currentScreenSize: BreakpointType;
        keys.forEach((key, index) => {
            if (index === 0) {
                if (_document.clientWidth > _sortedValues[key]) currentScreenSize = key;
            }
            else {
                if (_document.clientWidth >= _sortedValues[key] - (theme.specs.breakpoint.step / 100)) currentScreenSize = key;
            }
        })

        return currentScreenSize;
    }

    return {
        screenSize: _getScreenSize(),
        sortBreakpointsValues: _sortBreakpointsValues
    }
}