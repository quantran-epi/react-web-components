interface IComponentClassNames {
    button: string;
}

const componentClassNameGenerator = (name: string, prefix: string = "ui") =>
    prefix.concat('-').concat(name);

export const ComponentClassNames: IComponentClassNames = {
    button: componentClassNameGenerator("button")
}