import React, {Component} from 'react';
import {RootState} from "../../../store/reducer";
import {connect} from "react-redux";
import {LightData} from "../../../../../manager/src/module/light/light";
import {List, ListItem} from "@material-ui/core";
import Light from "../light/Light";

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
	render() {
		return (
			<List>
				{this.props.lights.map(l => <Light data={l}/>)}
				<ListItem/>
			</List>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
