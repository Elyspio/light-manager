import React, {Component} from 'react';
import {Box, Button, IconButton, Typography} from "@material-ui/core";
import {LightData} from "../../../../../manager/src/module/light/light";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import "./Light.scss"
import {LightService} from "../../../model/LightService";
import {RootState} from "../../../store/reducer";
import {Dispatch} from "redux";
import {setForDetail} from "../../../store/module/lights/action";
import {Ip} from "../../../../../manager/src/module/light/types";
import {connect, ConnectedProps} from "react-redux";





const mapStateToProps = (state: RootState) => ({a: 1})
const mapDispatchToProps = (dispatch: Dispatch) => ({
	setSelected: (l: Ip) => dispatch(setForDetail(l))
})

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof  connector>;


interface Props extends  ReduxTypes {
	data: LightData
}

class Light extends Component<Props> {
	render() {
		const data = this.props.data;

		const available = data.connected;

		return (
			<Box className={"Light"}  onClick={this.setSelected}>
				<Typography className={"name"}>{data.name}</Typography>
				<IconButton  disabled={!available} onClick={() => LightService.instance.toggle(data)} className={"btn-power"}>
					<PowerSettingsNewIcon
						style={data.powered ? {color: "orange"} : undefined}/>
				</IconButton>
			</Box>
		);
	}

	private setSelected = () => {
	//	this.props.setSelected(this.props.data.ip);
	}
}

export default connector(Light);
