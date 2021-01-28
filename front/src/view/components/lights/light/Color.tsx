import React, {Component} from 'react';
import {AccordionDetails, Button, Typography} from "@material-ui/core";
import {Services} from "../../../../core/services";
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";
import {RootState} from "../../../store/reducer";
import {LightDataModel} from "../../../../core/apis/back/models";
import "./Color.scss"
import ColorPicker, {Color as IColor, toColor} from "react-color-palette";
import {ColorHelper} from "../../../../core/helper/light";


const mapStateToProps = (state: RootState) => ({
    data: state.light!.current as LightDataModel,
    presets: state.light.presets,
    theme: state.theme.current
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;


let preventSpam: NodeJS.Timeout | undefined


type State = {
    currentColor: IColor
}

interface Props extends ReduxTypes {
    className?: string
}


class Color extends Component<Props, State> {


    constructor(props: Props) {
        super(props);
        this.state = {
            currentColor: toColor("rgb", {
                r: props.data.color.r,
                g: props.data.color.g,
                b: props.data.color.b
            })
        }
    }


    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if (ColorHelper.fromRgb(this.props.data.color) !== ColorHelper.fromRgb(prevProps.data.color)) {
            this.setState({
                currentColor: toColor("rgb", {
                    r: this.props.data.color.r,
                    g: this.props.data.color.g,
                    b: this.props.data.color.b
                })
            })
        }
    }

    async componentDidMount() {
        await Services.light.getPresets();
    }

    render() {
        const {data, presets} = this.props;

        return (
            <AccordionDetails
                className={"Color " + (this.props.className ?? "")}>
                <div className="line">
                    <Typography variant={"h6"} className={"heading"}>Preset</Typography>
                    <div className="preset">
                        <div>
                            <Button variant={"outlined"}
                                    style={{color: this.getColorCode("day")}}
                                    onClick={() => Services.light.setPreset("day", data)}>
                                Day
                            </Button>
                        </div>
                        <div>
                            <Button variant={"outlined"}
                                    style={{color: this.getColorCode("night")}}
                                    onClick={() => Services.light.setPreset("night", data)}>
                                Night
                            </Button>
                        </div>

                    </div>
                </div>


                <div className="line">
                    <Typography variant={"h6"} className={"heading"}>Custom</Typography>
                    <div className={"color-picker-container"}>
                        <ColorPicker width={300} height={150} color={this.state.currentColor} onChange={this.changeColor} dark={this.props.theme === "dark"}/>
                    </div>
                </div>


            </AccordionDetails>
        );
    }

    changeColor = async (color: IColor) => {
        if (color) {
            if (preventSpam) {
                clearTimeout(preventSpam)
            }
            preventSpam = setTimeout(() => Services.light.setColor(this.props.data, ColorHelper.fromRgb(color.rgb)), 250)
        }
    }

    private getColorCode = (key: "day" | "night") => {
        let code = this.props.presets.find(p => p.key === key)?.color;
        if (this.props.theme === "light" && key === "day") {
            code = "#000"
        }
        return code;
    }
}


export default connector(Color);
