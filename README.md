# M3 Tailwind Colors

**M3 Tailwind Colors** is a utility package that generates Material 3 colors for use with Tailwind CSS, specifically designed to integrate seamlessly with Tailwind and NativeWind (React Native).

## Features

- Generate a full palette of Material 3 colors based on a primary color.
- Easily integrate with Tailwind CSS or NativeWind projects.
- Supports both light and dark color schemes.

## Installation

First, install the package via npm:

```bash
npm install m3-tailwind-colors
```

This will automatically install the necessary dependencies, including @material/material-color-utilities.

## Usage

To use the generated colors in your Tailwind CSS configuration, follow these steps:

    Import and Generate Colors: Use the M3TailwindColors function to generate your Material 3 color palette based on a primary color.

    Extend Tailwind's Colors: Add the generated colors to the extend.colors section of your Tailwind configuration.

Example Tailwind Configuration

Here's an example of how to set up your tailwind.config.js file:
```javascript
/** @type {import('tailwindcss').Config} */ 

const { M3TailwindColors } = require('m3-tailwind-colors');

const generatedColors = M3TailwindColors({
  primary: "#CE7E00", // Replace with your primary color
  otherCustomColor:"#65ff34" //optional
});

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ...generatedColors,
      },
       
    },
  },
  plugins: [],
};
```

## Parameters

The M3TailwindColors function accepts an object with the following parameters:

    primary: The base color in hexadecimal format. This will be used to generate the Material 3 color scheme.

## Generated Colors

The generated color palette will include various shades and tones derived from the primary color, ready to be used in both light and dark modes.