import React, {Component} from 'react';
import {RootState} from "../../../store/reducer";
import {connect} from "react-redux";
import {LightData} from "../../../../../manager/src/module/light/light";
import "./Manager.scss";
import {Room} from "../../../../../manager/src/config/lights";
import {Board} from "../Board";
import Light from "./Light";

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

			const lights = [...this.props.lights].sort((a: LightData, b: LightData) => {
				if (a.room < b.room) {
					return -1
				} else if (a.room === b.room) {
					return a.name < b.name ? -1 : 1;
				} else {
					return 1;
				}
			});


		return (
			<Board className={"Manager"} title={"Lampes"}>
				{lights.map(l => <Light key={l.id} data={l}/>)}
			</Board>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
