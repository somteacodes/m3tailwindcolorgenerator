import {
    argbFromHex,
    hexFromArgb,
    customColor,
    SchemeContent,
    Hct,
    MaterialDynamicColors,
    SchemeExpressive,
    SchemeFidelity,
    SchemeMonochrome,
    SchemeNeutral,
    SchemeTonalSpot,
    SchemeVibrant,
    DynamicColor,
  } from "@material/material-color-utilities";
  
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
  
  type SchemeObject =
    | SchemeContent
    | SchemeExpressive
    | SchemeFidelity
    | SchemeMonochrome
    | SchemeNeutral
    | SchemeTonalSpot
    | SchemeVibrant;
  
  const toKebabCase = (str: string): string => {
    return str
      .split("")
      .map((char, index) => {
        return char.toUpperCase() === char
          ? `${index !== 0 ? "-" : ""}${char.toLowerCase()}`
          : char;
      })
      .join("");
  };
  
  const getSchemeObject = (
    scheme: string,
    source: number,
    isDark: boolean,
    contrast: number
  ): SchemeObject => {
    const SchemeObjects: Record<
      string,
      new (hct: Hct, isDark: boolean, contrast: number) => SchemeObject
    > = {
      content: SchemeContent,
      expressive: SchemeExpressive,
      fidelity: SchemeFidelity,
      monochrome: SchemeMonochrome,
      neutral: SchemeNeutral,
      tonalSpot: SchemeTonalSpot,
      vibrant: SchemeVibrant,
    };
  
    const SchemeClass = SchemeObjects[scheme] || SchemeObjects.content;
    return new SchemeClass(Hct.fromInt(source), isDark, contrast);
  };
  const AllMaterialDynamicColors: Record<
    string,
    (typeof MaterialDynamicColors)[keyof typeof MaterialDynamicColors]
  > = {
    background: MaterialDynamicColors.background,
    onBackground: MaterialDynamicColors.onBackground,
    surface: MaterialDynamicColors.surface,
    surfaceDim: MaterialDynamicColors.surfaceDim,
    surfaceBright: MaterialDynamicColors.surfaceBright,
    surfaceContainerLowest: MaterialDynamicColors.surfaceContainerLowest,
    surfaceContainerLow: MaterialDynamicColors.surfaceContainerLow,
    surfaceContainer: MaterialDynamicColors.surfaceContainer,
    surfaceContainerHigh: MaterialDynamicColors.surfaceContainerHigh,
    surfaceContainerHighest: MaterialDynamicColors.surfaceContainerHighest,
    onSurface: MaterialDynamicColors.onSurface,
    surfaceVariant: MaterialDynamicColors.surfaceVariant,
    onSurfaceVariant: MaterialDynamicColors.onSurfaceVariant,
    inverseSurface: MaterialDynamicColors.inverseSurface,
    onInverseSurface: MaterialDynamicColors.inverseOnSurface,
    outline: MaterialDynamicColors.outline,
    outlineVariant: MaterialDynamicColors.outlineVariant,
    primary: MaterialDynamicColors.primary,
    onPrimary: MaterialDynamicColors.onPrimary,
    primaryContainer: MaterialDynamicColors.primaryContainer,
    onPrimaryContainer: MaterialDynamicColors.onPrimaryContainer,
    inversePrimary: MaterialDynamicColors.inversePrimary,
    secondary: MaterialDynamicColors.secondary,
    onSecondary: MaterialDynamicColors.onSecondary,
    secondaryContainer: MaterialDynamicColors.secondaryContainer,
    onSecondaryContainer: MaterialDynamicColors.onSecondaryContainer,
    tertiary: MaterialDynamicColors.tertiary,
    onTertiary: MaterialDynamicColors.onTertiary,
    tertiaryContainer: MaterialDynamicColors.tertiaryContainer,
    onTertiaryContainer: MaterialDynamicColors.onTertiaryContainer,
    error: MaterialDynamicColors.error,
    onError: MaterialDynamicColors.onError,
    errorContainer: MaterialDynamicColors.errorContainer,
    onErrorContainer: MaterialDynamicColors.onErrorContainer,
    scrim: MaterialDynamicColors.scrim,
    shadow: MaterialDynamicColors.shadow,
    surfaceTint: MaterialDynamicColors.surfaceTint,
  };
  
  const generateColors = (
    colorsMap: ColorsMap,
    themeConfig: ThemeConfig = { scheme: "content", contrast: 0 },
    isDark = false,
    useKebabCase = false
  ): Record<string, string> => {
    const { primary, ...extraColors } = colorsMap;
    const { scheme, contrast } = themeConfig;
  
    const source = argbFromHex(primary);
    const colorScheme = getSchemeObject(scheme, source, isDark, contrast);
  
    const colors: Record<string, string> = {};
  
    Object.entries(AllMaterialDynamicColors).forEach(([name, colorName]) => {
      const hex = hexFromArgb((colorName as DynamicColor).getArgb(colorScheme));
  
      if (useKebabCase) {
        const kebabName = toKebabCase(name);
        colors[kebabName] = hex;
      } else {
        colors[name] = hex;
      }
    });
  
    Object.entries(extraColors).forEach(([colorName, value]) => {
      const colorConfig: ColorConfig =
        typeof value === "string" ? { hex: value } : value;
      const hex = colorConfig.hex || "";
      const blend = colorConfig.harmonize ?? true;
      const customScheme = customColor(source, {
        value: argbFromHex(hex),
        blend,
        name: "",
      })[isDark ? "dark" : "light"];
  
      if (useKebabCase) {
        const kebabName = toKebabCase(colorName);
        colors[kebabName] = hexFromArgb(customScheme.color);
        colors[`on-${kebabName}`] = hexFromArgb(customScheme.onColor);
        colors[`${kebabName}-container`] = hexFromArgb(
          customScheme.colorContainer
        );
        colors[`on-${kebabName}-container`] = hexFromArgb(
          customScheme.onColorContainer
        );
      } else {
        const camelCaseName =
          colorName.charAt(0).toUpperCase() + colorName.slice(1);
        colors[colorName] = hexFromArgb(customScheme.color);
        colors[`on${camelCaseName}`] = hexFromArgb(customScheme.onColor);
        colors[`${camelCaseName}Container`] = hexFromArgb(
          customScheme.colorContainer
        );
        colors[`on${camelCaseName}Container`] = hexFromArgb(
          customScheme.onColorContainer
        );
      }
    });
  
    return colors;
  };
  
  const M3TailwindConfigColors = (
    colorsMap: ColorsMap,
    themeConfig: ThemeConfig,
    useKebabCase: boolean = true
  ): Record<string, { DEFAULT: string; dark: string }> => {
    const lightColors = generateColors(
      colorsMap,
      themeConfig,
      false,
      useKebabCase
    );
    const darkColors = generateColors(colorsMap, themeConfig, true, useKebabCase);
  
    const colors: Record<string, { DEFAULT: string; dark: string }> = {};
    Object.keys(lightColors).forEach((key) => {
      colors[key] = {
        DEFAULT: lightColors[key],
        dark: darkColors[key],
      };
    });
  
    return colors;
  };
  
  const M3TailwindRNColors = (
    colorsMap: ColorsMap,
    themeConfig: ThemeConfig,
    useKebabCase: boolean = true
  ): { light: Record<string, string>; dark: Record<string, string> } => {
    return {
      light: generateColors(colorsMap, themeConfig, false, useKebabCase),
      dark: generateColors(colorsMap, themeConfig, true, useKebabCase),
    };
  };
   
  export { M3TailwindRNColors, M3TailwindConfigColors };
  