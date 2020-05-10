import * as React from 'react';
import {LightData} from "../../../../../manager/src/module/light/light";
import '../manager/Light.scss'
import {RootState} from "../../../store/reducer";
import {connect} from "react-redux";
import {Board} from "../Board";

export interface Props extends StateProps, DispatchProps {
}

interface StateProps {
	current: LightData
}

interface DispatchProps {
}

const mapStateToProps = (state: RootState) => ({
	current: state.light.current
});
// const mapDispatchToProps = (dispatch: Function) => ({
// 	refresh: (data: LightData) => dispatch(refreshLight(data))
// });

interface State {
	lock: boolean,
	open: boolean
}

class Detail extends React.Component<Props, State> {

	state = {
		lock: false,
		open: false
	}

	render() {
		let {current: data} = this.props;

		if (data === undefined) return null;

		return (
			<Board title={`Lampe : ${data.name}`}>
				info
				couleurs
			</Board>
		);
	}

	private lock = () => {
		this.setState(prev => ({
			lock: !prev.lock
		}))
	}


	private show = () => {
		this.setState(prev => ({open: !prev.open}))
	}
}

export default connect(mapStateToProps, null)(Detail) as any
