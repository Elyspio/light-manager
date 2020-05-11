import * as React from 'react';
import {RootState} from "../../../store/reducer";
import {connect, ConnectedProps} from "react-redux";
import {Board, ThemeColor} from "../Board";
import {Dispatch} from "redux";
import {Box, Button, Slider, Typography} from "@material-ui/core";
import "./Detail.scss"
import {LightService} from "../../../model/LightService";
import {LightData} from "../../../../../manager/src/module/light/light";

const mapStateToProps = (state: RootState) => ({
	current: state.light.current as LightData,
	theme: state.theme.current
})
const mapDispatchToProps = (dispatch: Dispatch) => ({})


const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;


export interface Props {
}


class Detail extends React.Component<Props & ReduxTypes> {


	render() {
		let {current: data} = this.props;

		if (data === undefined) return null;

		const colors: ThemeColor = {
			dark: {
				fg: "#FFF",
				bg: "#005683"
			},
			light: {
				fg: "#fff",
				bg: "#62727b"
			}
		}


		let marks = [{label: "1%", value: 1}, {label: "100%", value: 100}];
		return (
			<Board className={"Detail"} title={`Lampe : ${data.name}`}>
				<Board title={"Couleurs"} color={colors}
				       border={false}
				       expansionable>
					<Typography>Disabled Expansion Panel</Typography>
				</Board>

				<Board title={"Informations"} color={colors}
				       expanded
				       border={false}
				       expansionable>
					<Box className={"state"}>
						<Typography>Etats</Typography>
						<Button onClick={() => this.setLightState(true)}>
							Allumer
						</Button>
						<Button onClick={() => this.powerOnly()}>
							Eteindre les autres
						</Button>
						<Button onClick={() => this.setLightState(false)}>
							Eteindre
						</Button>
					</Box>
					<Box className={"luminosity"}>
						<Typography>Luminosité</Typography>
						<Slider
							marks={marks}
							defaultValue={this.props.current?.brightness}
							min={0}
							max={100}
							valueLabelDisplay="auto"
							onChange={(e, v) => this.onBrighnessChange(v as number)}
						/>
					</Box>
				</Board>
			</Board>
		);
	}

	private onBrighnessChange = async (value: number) => {
		await LightService.instance.setBrighness(this.props.current, value)
	}

	private setLightState = (state: boolean) => LightService.instance.setState(this.props.current, state)

	private powerOnly = async () => {
		await LightService.instance.powerOnly(this.props.current)
	}
}

export default connector(Detail) as any
