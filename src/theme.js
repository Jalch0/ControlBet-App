import { createContext, useMemo, useState } from "react"
import { createTheme } from "@mui/material/styles"

// Color design tokens 


//Produce shades with tailwind shades windows + kg

export const tokens = (mode) => ({
    ...(mode === 'dark'
    ? {
        grey: {
            100: "#e0e0e0",
            200: "#c2c2c2",
            300: "#a3a3a3",
            400: "#858585",
            500: "#666666",
            600: "#525252",
            700: "#3d3d3d",
            800: "#292929",
            900: "#141414"
        },
        primary: {
            100: "#d0d1d5",
            200: "#a1a4ab",
            300: "#727681",
            400: "#1F2A40",
            500: "#141b2d",
            600: "#101624",
            700: "#0c101b",
            800: "#080b12",
            900: "#040509"
        },
        greenAccent: {
            100: "#e9f9fc",
            200: "#d3f3f9",
            300: "#bcecf5",
            400: "#a6e6f2",
            500: "#90e0ef",
            600: "#73b3bf",
            700: "#56868f",
            800: "#3a5a60",
            900: "#1d2d30"
        },
        redAccent: {
            100: "#f8dcdb",
            200: "#f1b9b7",
            300: "#e99592",
            400: "#e2726e",
            500: "#db4f4a",
            600: "#af3f3b",
            700: "#832f2c",
            800: "#58201e",
            900: "#2c100f"
        },
        blueAccent: {
            100: "#cce4f0",
            200: "#99c9e2",
            300: "#66add3",
            400: "#3392c5",
            500: "#0077b6",
            600: "#005f92",
            700: "#00476d",
            800: "#003049",
            900: "#001824"
        },
    }
    // No dark
    : {
        grey: {
            100: "#141414",
            200: "#292929",
            300: "#3d3d3d",
            400: "#525252",
            500: "#666666",
            600: "#858585",
            700: "#a3a3a3",
            800: "#c2c2c2",
            900: "#e0e0e0",
        },
        primary: {
            100: "#040509",
            200: "#080b12",
            300: "#0c101b",
            400: "#f2f0f0",
            500: "#141b2d",
            600: "#434957",
            700: "#727681",
            800: "#a1a4ab",
            900: "#d0d1d5",
        },
        greenAccent: {
            100: "#d5eaec",
            200: "#aad6d9",
            300: "#80c1c6",
            400: "#55adb3",
            500: "#2b98a0",
            600: "#227a80",
            700: "#1a5b60",
            800: "#113d40",
            900: "#091e20"
        },
        redAccent: {
            100: "#2c100f",
            200: "#58201e",
            300: "#832f2c",
            400: "#af3f3b",
            500: "#db4f4a",
            600: "#e2726e",
            700: "#e99592",
            800: "#f1b9b7",
            900: "#f8dcdb",
        },
        blueAccent: {
            100: "#cce4f0",
            200: "#99c9e2",
            300: "#66add3",
            400: "#3392c5",
            500: "#0077b6",
            600: "#005f92",
            700: "#00476d",
            800: "#003049",
            900: "#001824"
        },
    }),
});


// Mui theme settings

export const themeSettings = (mode) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
            ? {
                primary: {
                    main: colors.primary[500]
                },
                secondary: {
                    main: colors.greenAccent[500], 
                },
                neutral: {
                    dark: colors.grey[700],
                    main: colors.grey[500],
                    light: colors.grey[100]
                },
                background: {
                    default: colors.primary[500],
                }
            } : {
                primary: {
                    main: colors.primary[100],
                },
                secondary: {
                    main: colors.greenAccent[500], 
                },
                neutral: {
                    dark: colors.grey[700],
                    main: colors.grey[500],
                    light: colors.grey[100]
                },
                background: {
                    default: "#fcfcfc",
                }, 
            }),
        },
        typography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join[","],
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join[","],
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join[","],
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join[","],
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join[","],
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join[","],
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join[","],
                fontSize: 14,
            },
        }
    };
};

// Context for color mode

export const ColorModeContext = createContext({
    toggleColorMode: () => {

    }
});

export const useMode = () => {
    const [mode, setMode] = useState("dark");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

    return [theme, colorMode];
}
