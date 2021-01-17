import React, {Component} from 'react';
import {AccordionDetails, Button} from "@material-ui/core";
import {LightData} from "../../../../../../back/src/core/services/light/light";
import {Services} from "../../../../core/services";


interface Props {
    data: LightData,
    className?: string
}

export class Action extends Component<Props> {

    render() {
        const {data} = this.props;
        const toggle = <Button
            onClick={this.toggle}
            variant={"outlined"}
            color={data.powered ? "primary" : "secondary"}>
            {data.powered ? "Eteindre" : "Allumer"}
        </Button>

        return (
            <AccordionDetails
                className={"Action " + this.props.className ?? ""}>
                {toggle}

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

