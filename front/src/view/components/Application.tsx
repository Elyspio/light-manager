import * as React from 'react';
import {Box, Paper} from "@material-ui/core";
import "./Application.scss"
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";
import {RootState} from "../store/reducer";
import {toggleTheme} from "../store/module/theme/action";
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import {Common} from "./lights/common/Common";
import Manager from "./lights/manager/Manager";
import {Action, Drawer} from "./utils/drawer/Drawer";
import Detail from "./lights/light/Detail";
import {Apis} from "../../core/apis";
import {Services} from "../../core/services";

const mapStateToProps = (state: RootState) => ({theme: state.theme.current, isLightSelected: !!state.light.current})

const mapDispatchToProps = (dispatch: Dispatch) => ({toggleTheme: () => dispatch(toggleTheme())})

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;

export interface Props {
}

interface State {
    something: object
}

class Application extends React.Component<Props & ReduxTypes, State> {


    async componentDidMount() {
       await Services.api.refresh();
    }

    render() {
        const actions: Action[] = [{
            icon: this.props.theme === "dark" ? <Brightness5Icon/> : <Brightness3Icon/>,
            text: "Toggle Theme",
            onClick: this.props.toggleTheme
        }]
        return (
            <Paper square className={"Application"}>
                <Drawer position={"right"} actions={actions}>
                    <div className="content">
                        <Box className={"inner"}>
                            <div className={"left"}>
                                <Manager/>
                                <Common/>
                            </div>
                            <div className="right">
                                {this.props.isLightSelected && <Detail/>}
                            </div>
                        </Box>
                    </div>


                </Drawer>

            </Paper>
        );
    }
}

export default connector(Application)
