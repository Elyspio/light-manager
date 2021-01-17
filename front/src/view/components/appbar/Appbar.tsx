import "./Appbar.scss"
import React, {Component} from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';


interface Props {
    appName: string
}


class Appbar extends Component<Props> {
    render() {

        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        {this.props.appName}
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Appbar;
