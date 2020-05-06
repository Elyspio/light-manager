import React, {Component} from 'react';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
	Typography
} from "@material-ui/core";
import {LightService} from "../../../model/LightService";


interface State {
	open: boolean
}

class Common extends Component<{}, State> {

	state = {
		open: false
	}

	render() {
		return (
			<ExpansionPanel>
				<ExpansionPanelSummary className={"header"}>
					<Typography variant={"h6"}>
						Général
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className={"Light common"}>
					<Button variant={"outlined"}
					        onClick={this.switchOn}
					        color={"primary"}>
						Allumer
					</Button>

					<Button variant={"outlined"}
					        onClick={() => LightService.instance.setPreset("day")}>
						Day
					</Button>

					<Button variant={"outlined"}
					        onClick={() => LightService.instance.setPreset("night")}>
						Night
					</Button>

					<Button variant={"outlined"}
					        onClick={() => LightService.instance.switchAll(false)}
					        color={"secondary"}>
						Eteindre
					</Button>
				</ExpansionPanelDetails>


				<Dialog
					open={this.state.open}
					onClick={() => this.handleClose(false)}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle
						id="alert-dialog-title">{"Etes vous sur de vouloir allumer toutes les lampes"}</DialogTitle>
					<DialogActions>
						<Button onClick={() => this.handleClose(false)}
						        color="primary">
							Non
						</Button>
						<Button onClick={() => this.handleClose(true)}
						        color="primary" autoFocus>
							Oui
						</Button>
					</DialogActions>
				</Dialog>

			</ExpansionPanel>
		);

	}

	private switchOn = () => {
		this.setState({
			open: true
		})
	}

	private handleClose = (aggred: boolean) => {
		if (aggred) {
			return LightService.instance.switchAll(true);
		}
		this.setState({
			open: false
		})
	}
}

export default Common;
