import React from "react";
import {Divider} from "@material-ui/core";

export function joinComponent(wit: "divider", ...elements: JSX.Element[]) {
    const a: JSX.Element[] = [];
    elements.forEach((e, i) => {
        if (i !== 0 && i <= elements.length - 1 && wit === "divider") a.push(<Divider key={Math.random().toString()}/>);
        a.push(e);
    })
    return a;
}
