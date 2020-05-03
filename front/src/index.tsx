import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import Application from './components/Application';
import store from './store';

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

// Render components
const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<Application/>
		</Provider>,
		mainElement
	);
};

render();
