'use strict';

var materialColorUtilities = require('@material/material-color-utilities');

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
        content: materialColorUtilities.SchemeContent,
        expressive: materialColorUtilities.SchemeExpressive,
        fidelity: materialColorUtilities.SchemeFidelity,
        monochrome: materialColorUtilities.SchemeMonochrome,
        neutral: materialColorUtilities.SchemeNeutral,
        tonalSpot: materialColorUtilities.SchemeTonalSpot,
        vibrant: materialColorUtilities.SchemeVibrant,
    };
    const SchemeClass = SchemeObjects[scheme] || SchemeObjects.content;
    return new SchemeClass(materialColorUtilities.Hct.fromInt(source), isDark, contrast);
};
const AllMaterialDynamicColors = {
    background: materialColorUtilities.MaterialDynamicColors.background,
    onBackground: materialColorUtilities.MaterialDynamicColors.onBackground,
    surface: materialColorUtilities.MaterialDynamicColors.surface,
    surfaceDim: materialColorUtilities.MaterialDynamicColors.surfaceDim,
    surfaceBright: materialColorUtilities.MaterialDynamicColors.surfaceBright,
    surfaceContainerLowest: materialColorUtilities.MaterialDynamicColors.surfaceContainerLowest,
    surfaceContainerLow: materialColorUtilities.MaterialDynamicColors.surfaceContainerLow,
    surfaceContainer: materialColorUtilities.MaterialDynamicColors.surfaceContainer,
    surfaceContainerHigh: materialColorUtilities.MaterialDynamicColors.surfaceContainerHigh,
    surfaceContainerHighest: materialColorUtilities.MaterialDynamicColors.surfaceContainerHighest,
    onSurface: materialColorUtilities.MaterialDynamicColors.onSurface,
    surfaceVariant: materialColorUtilities.MaterialDynamicColors.surfaceVariant,
    onSurfaceVariant: materialColorUtilities.MaterialDynamicColors.onSurfaceVariant,
    inverseSurface: materialColorUtilities.MaterialDynamicColors.inverseSurface,
    onInverseSurface: materialColorUtilities.MaterialDynamicColors.inverseOnSurface,
    outline: materialColorUtilities.MaterialDynamicColors.outline,
    outlineVariant: materialColorUtilities.MaterialDynamicColors.outlineVariant,
    primary: materialColorUtilities.MaterialDynamicColors.primary,
    onPrimary: materialColorUtilities.MaterialDynamicColors.onPrimary,
    primaryContainer: materialColorUtilities.MaterialDynamicColors.primaryContainer,
    onPrimaryContainer: materialColorUtilities.MaterialDynamicColors.onPrimaryContainer,
    inversePrimary: materialColorUtilities.MaterialDynamicColors.inversePrimary,
    secondary: materialColorUtilities.MaterialDynamicColors.secondary,
    onSecondary: materialColorUtilities.MaterialDynamicColors.onSecondary,
    secondaryContainer: materialColorUtilities.MaterialDynamicColors.secondaryContainer,
    onSecondaryContainer: materialColorUtilities.MaterialDynamicColors.onSecondaryContainer,
    tertiary: materialColorUtilities.MaterialDynamicColors.tertiary,
    onTertiary: materialColorUtilities.MaterialDynamicColors.onTertiary,
    tertiaryContainer: materialColorUtilities.MaterialDynamicColors.tertiaryContainer,
    onTertiaryContainer: materialColorUtilities.MaterialDynamicColors.onTertiaryContainer,
    error: materialColorUtilities.MaterialDynamicColors.error,
    onError: materialColorUtilities.MaterialDynamicColors.onError,
    errorContainer: materialColorUtilities.MaterialDynamicColors.errorContainer,
    onErrorContainer: materialColorUtilities.MaterialDynamicColors.onErrorContainer,
    scrim: materialColorUtilities.MaterialDynamicColors.scrim,
    shadow: materialColorUtilities.MaterialDynamicColors.shadow,
    surfaceTint: materialColorUtilities.MaterialDynamicColors.surfaceTint,
};
const generateColors = (colorsMap, themeConfig = { scheme: "content", contrast: 0 }, isDark = false, useKebabCase = false) => {
    const { primary } = colorsMap, extraColors = __rest(colorsMap, ["primary"]);
    const { scheme, contrast } = themeConfig;
    const source = materialColorUtilities.argbFromHex(primary);
    const colorScheme = getSchemeObject(scheme, source, isDark, contrast);
    const colors = {};
    Object.entries(AllMaterialDynamicColors).forEach(([name, colorName]) => {
        const hex = materialColorUtilities.hexFromArgb(colorName.getArgb(colorScheme));
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
        const customScheme = materialColorUtilities.customColor(source, {
            value: materialColorUtilities.argbFromHex(hex),
            blend,
            name: "",
        })[isDark ? "dark" : "light"];
        if (useKebabCase) {
            const kebabName = toKebabCase(colorName);
            colors[kebabName] = materialColorUtilities.hexFromArgb(customScheme.color);
            colors[`on-${kebabName}`] = materialColorUtilities.hexFromArgb(customScheme.onColor);
            colors[`${kebabName}-container`] = materialColorUtilities.hexFromArgb(customScheme.colorContainer);
            colors[`on-${kebabName}-container`] = materialColorUtilities.hexFromArgb(customScheme.onColorContainer);
        }
        else {
            const camelCaseName = colorName.charAt(0).toUpperCase() + colorName.slice(1);
            colors[colorName] = materialColorUtilities.hexFromArgb(customScheme.color);
            colors[`on${camelCaseName}`] = materialColorUtilities.hexFromArgb(customScheme.onColor);
            colors[`${camelCaseName}Container`] = materialColorUtilities.hexFromArgb(customScheme.colorContainer);
            colors[`on${camelCaseName}Container`] = materialColorUtilities.hexFromArgb(customScheme.onColorContainer);
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

exports.M3TailwindColors = M3TailwindColors;
exports.M3TailwindConfigColors = M3TailwindConfigColors;
//# sourceMappingURL=index.js.map
