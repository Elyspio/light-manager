import * as React from 'react';
import Manager from "./lights/manager/Manager";
import {Paper} from "@material-ui/core";
import "./Application.scss"
import {Common} from "./lights/common/Common";
import Detail from "./lights/light/Detail";

class Application extends React.Component {
	render() {
		return (
			<Paper square={true} className={"Application"}>
				<div className={"left"}>
					<Manager/>
					<Common/>
				</div>
				<Detail/>
			</Paper>
		);
	}
}

export default Application
