import React, {CSSProperties, ReactNode} from "react";
import {Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Paper, Toolbar, Typography} from "@material-ui/core";
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";
import {RootState} from "../../store/reducer";
import "./Board.scss"

interface Props {
    title: string,
    className?: string
    size?: "small",
    color?: ThemeColor,
    children?: ReactNode,
    expansible?: boolean,
    elevation?: number;
    border?: boolean,
    expanded?: boolean
}

export interface Color {
    fg?: string,
    bg?: string
}

export interface ThemeColor {
    dark: Pick<Color, "fg" | "bg">,
    light: Pick<Color, "fg" | "bg">
}


const mapStateToProps = (state: RootState) => ({theme: state.theme.current})
const mapDispatchToProps = (dispatch: Dispatch) => ({})

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;


class BoardComponent extends React.Component<Props & ReduxTypes> {
    render() {

        const {color, title, theme, className, children, size, expansible, elevation, border, expanded} = this.props;

        const style: CSSProperties = {};
        if (color) {

            if (color[theme].fg) {
                style["color"] = color[theme].fg
            }

            if (color[theme].bg) {
                style["backgroundColor"] = color[theme].bg
            }
        }

        const classname = ["Board", size === "small" ? "small" : "", border === false ? "no-border" : ""]
        const header = <AppBar position={"static"} color={"default"}>
            <Toolbar>
                <Typography className={"header"}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>


        const content = <div className={"body " + (className ?? "")}>
            {children}
        </div>


        const total = expansible
            ? <Accordion defaultExpanded={expanded}>
                <AccordionSummary>
                    {header}
                </AccordionSummary>
                <AccordionDetails>
                    {content}
                </AccordionDetails>
            </Accordion>
            : <>{header} {content}</>


        const container = border === false
            ? <Box className={classname.join(" ")}>{total}</Box>
            : <Paper elevation={elevation} className={classname.join(" ")}>{total}</Paper>
        return container
    }
}

export const Board = connector(BoardComponent);
