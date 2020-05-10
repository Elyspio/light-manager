import React from "react";
import {AppBar, Paper, Toolbar, Typography} from "@material-ui/core";


interface Props {
	title: string,
	className?: string
}

export class Board extends React.Component<Props> {
	render() {
		return <Paper className={"Board"}>
			<AppBar position={"static"}>
				<Toolbar>
					<Typography	className={"header"}>
						{this.props.title}
					</Typography>
				</Toolbar>
			</AppBar>
			<div className={"body " + this.props.className}>
				{this.props.children}
			</div>
		</Paper>
	}
}
