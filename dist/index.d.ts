type ColorConfig = {
    hex?: string;
    harmonize?: boolean;
};
type ColorsMap = {
    primary: string;
    [key: string]: string | ColorConfig;
};
type ThemeConfig = {
    scheme: string;
    contrast: number;
};
declare const M3TailwindConfigColors: (colorsMap: ColorsMap, themeConfig: ThemeConfig, useKebabCase?: boolean) => Record<string, {
    DEFAULT: string;
    dark: string;
}>;
declare const M3TailwindColors: (colorsMap: ColorsMap, themeConfig: ThemeConfig, useKebabCase?: boolean) => {
    light: Record<string, string>;
    dark: Record<string, string>;
};
export { M3TailwindColors, M3TailwindConfigColors };
