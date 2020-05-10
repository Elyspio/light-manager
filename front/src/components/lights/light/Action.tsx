import React, {Component} from 'react';
import {Button, ExpansionPanelDetails} from "@material-ui/core";
import {LightData} from "../../../../../manager/src/module/light/light";
import {LightService} from "../../../model/LightService";


interface Props {
	data: LightData,
	className?: string
}

export class Action extends Component<Props> {

	render() {
		const {data} = this.props;
		const toggle = <Button
			onClick={this.toggle}
			variant={"outlined"}
			color={data.powered ? "primary" : "secondary"}>
			{data.powered ? "Eteindre" : "Allumer"}
		</Button>

		return (
			<ExpansionPanelDetails
				className={"Action " + this.props.className ?? ""}>
				{toggle}

				<Button variant={"outlined"}
				        onClick={() => LightService.instance.setPreset("day", data)}>
					Day
				</Button>
				<Button variant={"outlined"}
				        onClick={() => LightService.instance.setPreset("night", data)}>
					Night
				</Button>


			</ExpansionPanelDetails>
		);
	}

	private toggle = async () => {
		await LightService.instance.toggle(this.props.data);
	}
}

