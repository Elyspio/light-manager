import React, {Component} from 'react';
import {Box, IconButton, Typography} from "@material-ui/core";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import "./Light.scss"
import {RootState} from "../../../../core/store/reducer";
import {Dispatch} from "redux";
import {setForDetail} from "../../../../core/store/module/lights/action";
import {connect, ConnectedProps} from "react-redux";
import {Services} from "../../../../core/services";
import {LightDataModel} from "../../../../core/apis/back/models";
import {Ip} from "../../../../core/store/module/lights/reducer";


const mapStateToProps = (state: RootState) => ({
    theme: state.theme.current
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setSelected: (l: Ip) => dispatch(setForDetail(l))
})

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;


interface Props extends ReduxTypes {
    data: LightDataModel
}

class Light extends Component<Props> {
    render() {
        const data = this.props.data;

        const available = data.connected;

        const theme = this.props.theme;

        return (
            <Box className={`Light ${theme}`} onClick={this.setSelected}>
                <Typography className={"name"}>{data.name}</Typography>
                <IconButton disabled={!available}
                            onClick={this.onPowerClick}
                            className={"btn-power"}>
                    <PowerSettingsNewIcon color={data.powered ? "primary" : undefined}/>
                </IconButton>
            </Box>
        );
    }

    private onPowerClick = async (e: any) => {
        e.stopPropagation()
        await Services.light.toggle(this.props.data);
    }

    private setSelected = (e) => {
        this.props.setSelected(this.props.data.ip);
    }
}

export default connector(Light);
