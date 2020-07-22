import React, {ReactNode} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import _Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import './Drawer.scss'
import clsx from 'clsx';

export interface Action {
    text: string,
    icon: JSX.Element,
    onClick: Function
}


interface Props {
    children: ReactNode[],
    position: "left" | "right",
    actions?: Action[]
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
    }),
);

export default function Drawer(props: Props) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const getActions = (actions: Action[]) => {

        const separatorIndexes = actions
            .map((action, index) => action.text === null ? index : null)
            .filter(index => index !== null) as number[]

        const comp = separatorIndexes.map((value, index, array) => actions.slice(value, array[index + 1]))

        const actionComponents = (comp.length > 0 ? comp : [actions]).map(actions => <List key={Math.random().toString()}>
            {actions.map(action => <ListItem button key={action.text} onClick={() => action.onClick()}>
                <ListItemIcon>{action.icon}</ListItemIcon>
                <ListItemText primary={action.text}/>
            </ListItem>)}
        </List>);


        return <>
            {actionComponents.map((components, index) => <>{components} {index + 1 < actionComponents.length}</>)}
        </>

    }

    return (
        <div className={"Drawer"}>
            <_Drawer
                anchor={props.position}
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}>
                <div>
                    <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
                        {open ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                {props.actions ? getActions(props.actions) : null}
            </_Drawer>
            <main>
                {props.children}
            </main>
        </div>
    );
}
