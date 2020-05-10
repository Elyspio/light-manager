import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import {LightService} from "../../../model/LightService";
import {Board} from "../Board";


export class Common extends Component {

	render() {
		return (
			<Board title={"Commun"}>
				<Button variant={"outlined"}
				        onClick={() => LightService.instance.switchAll(true)}
				        color={"primary"}>
					Allumer
				</Button>

				<Button variant={"outlined"}
				        onClick={() => LightService.instance.switchAll(false)}
				        color={"secondary"}>
					Eteindre
				</Button>
			</Board>
		);
	}
}

