import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.scss'
import Application from './components/Application';
import store from './store';
import {ThemeProvider} from '@material-ui/core';
import {themes} from "./config/theme";


const theme = new URL(window.location.toString()).searchParams.get("theme") === "dark" ? themes.dark : themes.light;

// Render components
const render = () => {
	ReactDOM.render(
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<Application/>
			</Provider>
		</ThemeProvider>,

		document.getElementById("root")
	);
};

render();
