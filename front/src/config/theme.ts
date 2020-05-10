import {createMuiTheme} from "@material-ui/core";

const darkTheme = createMuiTheme({
	palette: {
		type: "dark",
		primary: {main: '#3ba3d4', contrastText: '#f9f9f9'},
		secondary: {main: '#FFA000', contrastText: '#000000'},
		background: {
			paper: "#1d1d1d",
			default: "#0e0e0e"
		}
	}
})

const lightTheme = createMuiTheme({
	palette: {
		type: "light",
		primary: {main: '#263238', contrastText: '#f9f9f9'},
		secondary: {main: '#FFA000', contrastText: '#000000'},
	}
})

export const themes = {
	dark: darkTheme,
	light: lightTheme
}



