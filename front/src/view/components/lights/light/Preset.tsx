import React, {Component} from 'react';
import {AccordionDetails, Button, Typography} from "@material-ui/core";
import {Services} from "../../../../core/services";
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";
import {RootState} from "../../../store/reducer";
import Divider from "@material-ui/core/Divider";
import {LightDataModel} from "../../../../core/apis/back/models";
import "./Preset.scss"
import ColorPicker from 'material-ui-color-picker'
import {ColorHelper} from "../../../../core/helper/light";

interface Props {
    className?: string
}


const mapStateToProps = (state: RootState) => ({
    data: state.light!.current as LightDataModel,
    presets: state.light.presets
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;


let preventSpam: NodeJS.Timeout | undefined


class Preset extends Component<Props & ReduxTypes> {


    async componentDidMount() {
        await Services.light.getPresets();
    }


    render() {
        const {data, presets} = this.props;

        return (
            <AccordionDetails
                className={"Preset " + (this.props.className ?? "")}>
                <div className="line">
                    <Typography>Preset</Typography>
                    <div className="btns">
                        <Button variant={"outlined"}
                                style={{color: presets.find(p => p.key === "day")?.color}}
                                onClick={() => Services.light.setPreset("day", data)}>
                            Day
                        </Button>
                        <Button variant={"outlined"}
                                style={{color: presets.find(p => p.key === "night")?.color}}
                                onClick={() => Services.light.setPreset("night", data)}>
                            Night
                        </Button>
                    </div>
                </div>


                <Divider className={"divider"} variant={"fullWidth"}/>
                <div className="line">
                    <Typography>Custom</Typography>
                    <div className="">
                        <ColorPicker
                            convert={"hex"}
                            name='color'
                            defaultValue={ColorHelper.convertRgbToString(data.color)}
                            onChange={this.changeColor}
                        />
                    </div>

                </div>


            </AccordionDetails>
        );
    }

    changeColor = async (color: string) => {
        if (color) {
            if (preventSpam) {
                clearTimeout(preventSpam)
            }
            preventSpam = setTimeout(() => Services.light.setColor(this.props.data, color), 250)
        }
    }
}


export default connector(Preset);
