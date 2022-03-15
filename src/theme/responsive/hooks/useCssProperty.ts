
interface IUseCssPropertyProps {

}

interface IUseCssProperty {
    getValueWithUnit: (value: string | number, unit?: string) => string;
    getString: (propName: string, propValue: string) => string;
}

export const useCssProperty = (props?: IUseCssPropertyProps): IUseCssProperty => {
    const _getValueWithUnit = (value: string | number, unit: string = "px"): string => {
        return typeof value === "string" ? value : value.toString().concat(unit);
    }

    const _getString = (propName: string, propValue: string) => {
        return `${propName}:${propValue};`
    }

    return {
        getString: _getString,
        getValueWithUnit: _getValueWithUnit
    }
}