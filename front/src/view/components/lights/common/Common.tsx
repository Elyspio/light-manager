import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import {Services} from "../../../../core/services";
import {Board} from "../Board";


export class Common extends Component {

    render() {
        return (
            <Board title={"Commun"}>
                <Button variant={"outlined"}
                        onClick={() => Services.light.switchAll(true)}
                        color={"primary"}>
                    Allumer
                </Button>

                <Button variant={"outlined"}
                        onClick={() => Services.light.switchAll(false)}
                        color={"secondary"}>
                    Eteindre
                </Button>
            </Board>
        );
    }
}

