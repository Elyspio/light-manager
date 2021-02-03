import React, {Component} from 'react';
import {RootState} from "../../../../core/store/reducer";
import {connect, ConnectedProps} from "react-redux";
import "./Manager.scss";
import {Board} from "../Board";
import Light from "./Light";
import {LightDataModel} from "../../../../core/apis/back/models";


const mapStateToProps = (state: RootState) => ({
    lights: state.light.lights
});
const mapDispatchToProps = (dispatch: Function) => ({});


const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;


class Manager extends Component<ReduxTypes> {

    render() {

        const lights = [...this.props.lights].sort((a: LightDataModel, b: LightDataModel) => {
            if (a.room.toString() < b.room) {
                return -1
            } else if (a.room === b.room) {
                return a.name < b.name ? -1 : 1;
            } else {
                return 1;
            }
        });


        return (
            <Board className={"Manager"} title={"Lights"}>
                {lights.map(l => <Light key={l.id} data={l}/>)}
            </Board>
        );
    }
}

export default connector(Manager);
