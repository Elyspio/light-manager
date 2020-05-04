import React, {Component} from 'react';
import {RootState} from "../../../store/reducer";
import {connect} from "react-redux";
import {LightData} from "../../../../../manager/src/module/light/light";
import {List, ListItem} from "@material-ui/core";
import Light from "../light/Light";
import "./Manager.scss";
import {names, Room} from "../../../config/lamps";
import {light} from "@material-ui/core/styles/createPalette";
import ListSubheader from "@material-ui/core/ListSubheader";

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

	group = (): {[key in Room]: Array<LightData & {name: string, room: Room}>} => {
		const returned:  {[key in Room]: Array<LightData & {name: string, room: Room}>} = {
			"living room": [],
			"chambers": [],
			"others": []
		}
		let lights = [...this.props.lights];
		lights.sort((a, b) => names[a.ip] < names[b.ip] ? -1: 1)
		lights.forEach(light => {
			const el = names[light.ip];
			if(el.room === "chambers") returned.chambers.push({...light, ...el})
			if(el.room === "living room") returned["living room"].push({...light, ...el})
			if(el.room === "others") returned.others.push({...light, ...el})
		})

		return returned;
	}

	render() {

		const {chambers, others, "living room": livingRoom} = this.group();


		return (
			<List className={"Manager"}>
						<ListSubheader color={"primary"}>Chambres</ListSubheader>
						{chambers.map(d => <Light data={d}/>)}
						<ListSubheader  color={"primary"}>Salon</ListSubheader>
						{livingRoom.map(d => <Light data={d}/>)}
						<ListSubheader color={"primary"}>Autres</ListSubheader >
						{others.map(d => <Light data={d}/>)}
			</List>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
