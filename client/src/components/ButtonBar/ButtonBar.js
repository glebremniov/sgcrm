import React from "react";
import {Button, ButtonGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ButtonBar = ({buttons}) => {

    return (
        <div className="float-right">
            <ButtonGroup aria-label="Basic example">
                {
                    buttons.map(btn => (
                        <Button key={btn.id} {...btn}>
                            <FontAwesomeIcon icon={btn.icon}/> {btn.label}
                        </Button>
                    ))
                }
            </ButtonGroup>
        </div>
    )
}

export default ButtonBar