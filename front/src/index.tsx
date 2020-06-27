import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {connect, ConnectedProps, Provider} from 'react-redux';
import './index.scss'
import Application from './components/Application';
import store from './store';
import {ThemeProvider} from '@material-ui/core';
import {themes} from "./config/theme";
import {Dispatch} from "redux";
import {RootState} from "./store/reducer";


const mapStateToProps = (state: RootState) => ({theme: state.theme.current})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;


export interface Props {
}


class AppContainer extends React.Component<Props & ReduxTypes> {
    render() {

        const theme = this.props.theme === "dark" ? themes.dark : themes.light;
        return (
            <ThemeProvider theme={theme}>
                <Application/>
            </ThemeProvider>
        );
    }
}

const App = connector(AppContainer) as any


// Render components
const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById("root")
    );
};

render();
