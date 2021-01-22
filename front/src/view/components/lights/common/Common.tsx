import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import {Services} from "../../../../core/services";
import {Board} from "../Board";
import "./Common.scss"

export class Common extends Component {

    render() {
        return (
            <Board title={"Common"} className={"Common"}>
                <div className="btns">
                    <Button variant={"outlined"}
                            onClick={() => Services.light.switchAll(true)}
                            color={"primary"}>
                        Power On
                    </Button>

                    <Button variant={"outlined"}
                            onClick={() => Services.light.switchAll(false)}
                            color={"secondary"}>
                        Power Off
                    </Button>
                </div>
            </Board>
        );
    }
}

