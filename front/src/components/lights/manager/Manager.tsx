import React, {Component} from 'react';
import {RootState} from "../../../store/reducer";
import {connect} from "react-redux";
import {LightData} from "../../../../../manager/src/module/light/light";
import {
	Box,
	Button,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
	Typography
} from "@material-ui/core";
import Light from "../light/Light";
import "./Manager.scss";
import {Room} from "../../../../../manager/src/config/lights";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import {LightService} from "../../../model/LightService";

interface StateProps {
	lights: LightData[]
}

interface DispatchProps {

}

const mapStateToProps = (state: RootState) => ({
	lights: state.light.lights
});
const mapDispatchToProps = (dispatch: Function) => ({});


class Manager extends Component<StateProps & DispatchProps> {

	group = (): { [key in Room]: Array<LightData> } => {
		const returned: { [key in Room]: Array<LightData> } = {
			"living room": [],
			"chambers": [],
			"others": []
		}
		let lights = [...this.props.lights];
		lights.forEach(light => {

			if (light.room === "chambers") returned.chambers.push(light)
			if (light.room === "living room") returned["living room"].push(light)
			if (light.room === "others") returned.others.push(light)
		})


		Object.keys(returned).forEach(l => returned[l].sort((a, b) => a.name < b.name ? -1 : 1))

		return returned;
	}

	render() {

		const {chambers, others, "living room": livingRoom} = this.group();


		return (
			<Box className={"Manager"}>
				<ExpansionPanel>
					<ExpansionPanelSummary className={"header"}>
						<Typography variant={"h6"}>
							Common
						</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails className={"Light common"}>
						<Button variant={"outlined"}
						        onClick={() => LightService.instance.switchAll(true)}
						        color={"primary"}>Allumer</Button>
						<Button variant={"outlined"}>Day</Button>
						<Button variant={"outlined"}>Night</Button>
						<Button variant={"outlined"}
						        onClick={() => LightService.instance.switchAll(false)}
						        color={"secondary"}>Eteindre</Button>
					</ExpansionPanelDetails>

				</ExpansionPanel>
				<ExpansionPanel>
					<ExpansionPanelSummary
						className={"header"}>
						<Typography variant={"h6"}>
							Chambres
						</Typography>
					</ExpansionPanelSummary>
					{chambers.map(d => <Light key={d.ip} data={d}/>)}
				</ExpansionPanel>
				<ExpansionPanel>
					<ExpansionPanelSummary
						className={"header"}>
						<Typography variant={"h6"}>
							Salon
						</Typography>
					</ExpansionPanelSummary>
					{livingRoom.map(d => <Light key={d.ip} data={d}/>)}
				</ExpansionPanel>

				<ExpansionPanel>
					<ExpansionPanelSummary
						className={"header"}>
						<Typography variant={"h6"}>
							Autres
						</Typography>
					</ExpansionPanelSummary>
					{others.map(d => <Light key={d.ip} data={d}/>)}
				</ExpansionPanel>

			</Box>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
