import {createMuiTheme, Theme} from "@material-ui/core";

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#00d65a',
        },
        secondary: {
            main: '#42a5f5',
        },
        background: {
            default: "rgb(36 36 36)",
            paper: "rgb(36 36 36)"
        }
    },
});

const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#000',
        },
        secondary: {
            main: '#42a5f5',
        },
        background: {}
    },
});

export const themes = {
    dark: darkTheme,
    light: lightTheme,
};

export type Themes = "dark" | "light";
export const getUrlTheme = (): Themes =>
    new URL(window.location.toString()).searchParams.get("theme") ||
    ("light" as any);

export const getCurrentTheme = (theme: Themes): Theme => themes[theme];
