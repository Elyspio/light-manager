import React, {Component} from 'react';
import {AccordionDetails, Button, Typography} from "@material-ui/core";
import {LightData} from "../../../../../../back/src/core/services/light/light";
import {Services} from "../../../../core/services";


interface Props {
    data: LightData,
    className?: string
}

export class Preset extends Component<Props> {

    render() {
        const {data} = this.props;

        return (
            <AccordionDetails
                className={"Preset " + this.props.className ?? ""}>
                <Typography>Preset</Typography>
                <Button variant={"outlined"}
                        onClick={() => Services.light.setPreset("day", data)}>
                    Day
                </Button>
                <Button variant={"outlined"}
                        onClick={() => Services.light.setPreset("night", data)}>
                    Night
                </Button>


            </AccordionDetails>
        );
    }

    private toggle = async () => {
        await Services.light.toggle(this.props.data);
    }
}

