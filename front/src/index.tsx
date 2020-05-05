import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.scss'
import Application from './components/Application';
import store from './store';


// Render components
const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<Application/>
		</Provider>,
		document.getElementById("root")
	);
};

render();
