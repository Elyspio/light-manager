import * as React from 'react';
import {LightData} from "../../../../../manager/src/module/light/light";
import {
	Button,
	ExpansionPanelDetails,
	IconButton,
	Typography
} from "@material-ui/core";
import './Light.scss'
import {LightService} from "../../../model/LightService";
import {RootState} from "../../../store/reducer";
import {refreshLight} from "../../../store/module/lights/action";
import {connect} from "react-redux";
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

export interface Props extends StateProps, DispatchProps {
	data: LightData
}

interface StateProps {

}

interface DispatchProps {
	refresh: (data: LightData) => void
}

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = (dispatch: Function) => ({
	refresh: (data: LightData) => dispatch(refreshLight(data))
});

interface State {
	lock: boolean
}

class Light extends React.Component<Props, State> {

	state = {
		lock: false
	}

	render() {
		let {data} = this.props;

		const toggle = <Button
			onClick={this.toggle}
			variant={"outlined"}
			disabled={this.state.lock}
			color={data.powered ? "primary" : "secondary"}>
			{data.powered ? "Eteindre" : "Allumer"}
		</Button>

		return (
			<ExpansionPanelDetails className="Light">
				<Typography>{data.name}</Typography>
				{toggle}
				<Button variant={"outlined"}
				        onClick={() => LightService.instance.setPreset("day", this.props.data)}
				disabled={this.state.lock}>Day</Button>
				<Button variant={"outlined"}
				        onClick={() => LightService.instance.setPreset("night", this.props.data)}
				disabled={this.state.lock}>Night</Button>
				<IconButton onClick={this.lock}>{this.state.lock ? <LockIcon/> :
					<LockOpenIcon/>}</IconButton>
			</ExpansionPanelDetails>

		);
	}

	private lock = () => {
		this.setState(prev => ({
			lock: !prev.lock
		}))
	}

	private toggle = async () => {
		await LightService.instance.toggle(this.props.data);
	}


	private refresh = async () => {
		const data = await LightService.instance.refresh(this.props.data);
		this.props.refresh(data);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Light)
