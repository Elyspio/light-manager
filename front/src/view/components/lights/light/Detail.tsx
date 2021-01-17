import * as React from 'react';
import {RootState} from "../../../store/reducer";
import {connect, ConnectedProps} from "react-redux";
import {Board, ThemeColor} from "../Board";
import {Dispatch} from "redux";
import {Box, Button, Slider, Typography} from "@material-ui/core";
import "./Detail.scss"
import {Services} from "../../../../core/services";
import {LightDataModel} from "../../../../core/apis/back/models";

const mapStateToProps = (state: RootState) => ({
    current: state.light.current as LightDataModel,
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

        let marks = [{label: "1%", value: 1}, {label: "100%", value: 100}];
        return (
            <Board className={"Detail"} title={`Lampe : ${data.name}`}>
                <Board title={"Couleurs"}
                       border={false}
                       expansible>
                    <Typography>Disabled Expansion Panel</Typography>
                </Board>

                <Board title={"Informations"}
                       expanded
                       border={false}
                       expansible>
                    <Box className={"state"}>
                        <Typography>Etats</Typography>
                        <Box className="btns">
                            <Button onClick={() => this.setLightState(true)} variant={"outlined"} disabled={data.powered}>
                                Allumer
                            </Button>
                            <Button onClick={() => this.powerOnly()} variant={"outlined"}>
                                Eteindre les autres
                            </Button>
                            <Button onClick={() => this.setLightState(false)} variant={"outlined"} disabled={!data.powered}>
                                Eteindre
                            </Button>
                        </Box>

                    </Box>
                    <Box className={"luminosity"}>
                        <Typography>Luminosité</Typography>
                        <Slider
                            marks={marks}
                            value={this.state.brightness}
                            min={0}
                            max={100}
                            valueLabelDisplay="auto"
                            onChange={(e, v) => this.onBrightnessChange(v as number)}
                        />
                    </Box>
                </Board>
            </Board>
        );
    }

    private onBrightnessChange = (value: number) => {
        if (this.requestTimeout) {
            clearTimeout(this.requestTimeout);
        }

        this.setState({
            brightness: value
        });

        this.requestTimeout = setTimeout(async () => {
            await Services.light.setBrightness(this.props.current, value);
        }, 100)

    }

    private setLightState = (state: boolean) => Services.light.setState(this.props.current, state)

    private powerOnly = async () => {
        await Services.light.powerOnly(this.props.current)
    }
}

export default connector(Detail) as any
