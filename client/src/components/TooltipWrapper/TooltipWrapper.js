import React from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const TooltipWrapper = ({id, label, placement = 'top', delay = {show: 50, hide: 50}, children}) => {
    const generateRandomId = () => {
        return Math.round(Math.random() * 10)
    }

    if (!label) {
        return children
    }

    return (
        <OverlayTrigger
            placement={placement}
            delay={delay}
            overlay={
                <Tooltip id={id || generateRandomId()}>
                    {label}
                </Tooltip>
            }>
            {
                children
            }
        </OverlayTrigger>
    );
}

export default TooltipWrapper