import * as React from 'react';
import {RootState} from "../../../store/reducer";
import {connect, ConnectedProps} from "react-redux";
import {Board, ThemeColor} from "../Board";
import {Dispatch} from "redux";
import {Box, Button, Slider, Typography} from "@material-ui/core";
import "./Detail.scss"
import {LightService} from "../../../model/LightService";
import {LightDataFull} from "../../../../../manager/src/module/light/light";

const mapStateToProps = (state: RootState) => ({
    current: state.light.current as LightDataFull,
    theme: state.theme.current
})
const mapDispatchToProps = (dispatch: Dispatch) => ({})


const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;


export interface Props extends ReduxTypes {
}

interface State {
    brightness: number
}

class Detail extends React.Component<Props, State> {

    state: State;
    private requestTimeout?: NodeJS.Timeout

    constructor(props: Props) {
        super(props);
        this.state = {
            brightness: props.current.brightness
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any) {
        console.log("componentDidUpdate", prevProps, prevState)
    }

    render() {
        let {current: data} = this.props;

        console.log("render", data);

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
                            value={this.state.brightness}
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

    private onBrighnessChange = (value: number) => {
        if (this.requestTimeout) {
            clearTimeout(this.requestTimeout);
        }

        this.setState({
            brightness: value
        });

        this.requestTimeout = setTimeout(async () => {
            await LightService.instance.setBrighness(this.props.current, value);
        }, 100)

    }

    private setLightState = (state: boolean) => LightService.instance.setState(this.props.current, state)

    private powerOnly = async () => {
        await LightService.instance.powerOnly(this.props.current)
    }
}

export default connector(Detail) as any
