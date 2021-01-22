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
            default: "#1B1B1B",
            paper: "#1B1B1B"
        }
    },
});

const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#4ea43b',
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
    ("dark" as any);

export const getCurrentTheme = (theme: Themes): Theme => themes[theme];
