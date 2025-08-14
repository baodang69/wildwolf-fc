"use client";

import React from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
      light: "#333333",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
      light: "#ffffff",
      dark: "#f5f5f5",
      contrastText: "#000000",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#666666",
    },
    divider: "#e0e0e0",
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.2,
      color: "#000000",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.3,
      color: "#000000",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
      lineHeight: 1.3,
      color: "#000000",
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.5rem",
      lineHeight: 1.4,
      color: "#000000",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.25rem",
      lineHeight: 1.4,
      color: "#000000",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.5,
      color: "#000000",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      color: "#000000",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
      color: "#666666",
    },
    button: {
      fontWeight: 500,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
        contained: {
          backgroundColor: "#000000",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#333333",
          },
        },
        outlined: {
          borderColor: "#000000",
          color: "#000000",
          "&:hover": {
            borderColor: "#333333",
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e0e0e0",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "& fieldset": {
              borderColor: "#e0e0e0",
            },
            "&:hover fieldset": {
              borderColor: "#000000",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#000000",
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#000000",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
