import * as React from 'react';
import {LightData} from "../../../../../manager/src/module/light/light";
import {Button, ListItem, Paper} from "@material-ui/core";
import './Light.scss'
import {LightService} from "../../../model/LightService";
import {RootState} from "../../../store/reducer";
import {refreshLight} from "../../../store/module/lights/action";
import {connect} from "react-redux";
import {names, Room} from "../../../config/lamps";

export interface Props extends StateProps, DispatchProps {
	data: LightData & {name: string, room: Room}
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


class Light extends React.Component<Props> {
	render() {
		let {data} = this.props;

		const toggle = <Button
			onClick={this.toggle}
			color={data.powered ? "primary" : "secondary"}>
			{data.powered ? "Eteindre" : "Allumer"}
		</Button>

		return (
			<ListItem className="Light" >
					<p>{data.name}</p>
					{toggle}
				<Button>Day</Button>
				<Button>Night</Button>
			</ListItem>

		);
	}

	private toggle = async () => {
		await LightService.toggle(this.props.data);
		await this.refresh();
	}


	private refresh = async () => {
		const data = await LightService.refresh(this.props.data);
		this.props.refresh(data);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Light)
