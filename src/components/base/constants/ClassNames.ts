interface IComponentClassNames {
    button: string;
    ripple: string;
}

const componentClassNameGenerator = (name: string, prefix: string = "Qui") =>
    prefix.concat('-').concat(name);

export const ComponentClassNames: IComponentClassNames = {
    button: componentClassNameGenerator("button"),
    ripple: componentClassNameGenerator("ripple")
}