import * as React from 'react';
import Manager from "./lights/manager/Manager";
import {IconButton, Paper} from "@material-ui/core";
import "./Application.scss"
import {Common} from "./lights/common/Common";
import Detail from "./lights/light/Detail";
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";
import {RootState} from "../store/reducer";
import {toggleTheme} from "../store/module/theme/action";
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness5Icon from '@material-ui/icons/Brightness5';

const mapStateToProps = (state: RootState) => ({theme: state.theme.current, currentLight: state.light.current})

const mapDispatchToProps = (dispatch: Dispatch) => ({toggleTheme: () => dispatch(toggleTheme())})

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;

export interface Props {
}

class Application extends React.Component<Props & ReduxTypes> {

    render() {


        return (
            <Paper square={true} className={"Application"}>
                <div className={"left"}>
                    <Manager/>
                    <Common/>
                </div>
                <div className="right">
                    {this.props.currentLight ? <Detail/> : null}
                </div>
                <IconButton className={"toggleTheme"}
                            onClick={this.props.toggleTheme}>
                    {this.props.theme === "dark" ? <Brightness5Icon/> :
                        <Brightness3Icon/>}
                </IconButton>
            </Paper>
        );
    }
}

export default connector(Application)
