import { MaterialDynamicColors, argbFromHex, hexFromArgb, customColor, Hct, SchemeContent, SchemeExpressive, SchemeFidelity, SchemeMonochrome, SchemeNeutral, SchemeTonalSpot, SchemeVibrant } from '@material/material-color-utilities';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const toKebabCase = (str) => {
    return str
        .split("")
        .map((char, index) => {
        return char.toUpperCase() === char
            ? `${index !== 0 ? "-" : ""}${char.toLowerCase()}`
            : char;
    })
        .join("");
};
const getSchemeObject = (scheme, source, isDark, contrast) => {
    const SchemeObjects = {
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
const AllMaterialDynamicColors = {
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
const generateColors = (colorsMap, themeConfig = { scheme: "content", contrast: 0 }, isDark = false, useKebabCase = false) => {
    const { primary } = colorsMap, extraColors = __rest(colorsMap, ["primary"]);
    const { scheme, contrast } = themeConfig;
    const source = argbFromHex(primary);
    const colorScheme = getSchemeObject(scheme, source, isDark, contrast);
    const colors = {};
    Object.entries(AllMaterialDynamicColors).forEach(([name, colorName]) => {
        const hex = hexFromArgb(colorName.getArgb(colorScheme));
        if (useKebabCase) {
            const kebabName = toKebabCase(name);
            colors[kebabName] = hex;
        }
        else {
            colors[name] = hex;
        }
    });
    Object.entries(extraColors).forEach(([colorName, value]) => {
        var _a;
        const colorConfig = typeof value === "string" ? { hex: value } : value;
        const hex = colorConfig.hex || "";
        const blend = (_a = colorConfig.harmonize) !== null && _a !== void 0 ? _a : true;
        const customScheme = customColor(source, {
            value: argbFromHex(hex),
            blend,
            name: "",
        })[isDark ? "dark" : "light"];
        if (useKebabCase) {
            const kebabName = toKebabCase(colorName);
            colors[kebabName] = hexFromArgb(customScheme.color);
            colors[`on-${kebabName}`] = hexFromArgb(customScheme.onColor);
            colors[`${kebabName}-container`] = hexFromArgb(customScheme.colorContainer);
            colors[`on-${kebabName}-container`] = hexFromArgb(customScheme.onColorContainer);
        }
        else {
            const camelCaseName = colorName.charAt(0).toUpperCase() + colorName.slice(1);
            colors[colorName] = hexFromArgb(customScheme.color);
            colors[`on${camelCaseName}`] = hexFromArgb(customScheme.onColor);
            colors[`${camelCaseName}Container`] = hexFromArgb(customScheme.colorContainer);
            colors[`on${camelCaseName}Container`] = hexFromArgb(customScheme.onColorContainer);
        }
    });
    return colors;
};
const M3TailwindConfigColors = (colorsMap, themeConfig, useKebabCase = true) => {
    const lightColors = generateColors(colorsMap, themeConfig, false, useKebabCase);
    const darkColors = generateColors(colorsMap, themeConfig, true, useKebabCase);
    const colors = {};
    Object.keys(lightColors).forEach((key) => {
        colors[key] = {
            DEFAULT: lightColors[key],
            dark: darkColors[key],
        };
    });
    return colors;
};
const M3TailwindColors = (colorsMap, themeConfig, useKebabCase = true) => {
    return {
        light: generateColors(colorsMap, themeConfig, false, useKebabCase),
        dark: generateColors(colorsMap, themeConfig, true, useKebabCase),
    };
};

export { M3TailwindColors, M3TailwindConfigColors };
//# sourceMappingURL=index.esm.js.map
