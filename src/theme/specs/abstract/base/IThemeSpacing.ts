export interface IThemeSpacing {
    scale: number;
    unit: "px" | "em" | "rem";
    generator: (factor: [number, number, number?, number?] | number) => string;
}