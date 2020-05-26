import React from "react";
import {Button, ButtonGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import TooltipWrapper from "../TooltipWrapper/TooltipWrapper";

const ButtonBar = ({buttons}) => {

    return (
        <div className="float-right">
            {/*<ButtonGroup aria-label="Basic example">*/}
                {
                    buttons.map(btn => (
                        <TooltipWrapper key={btn.id} label={btn.tooltip}>
                            <Button {...btn} className="ml-2">
                                <FontAwesomeIcon icon={btn.icon}/> {btn.label}
                            </Button>
                        </TooltipWrapper>
                    ))
                }
            {/*</ButtonGroup>*/}
        </div>
    )
}

export default ButtonBar