import React from "react";
import {Alert} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

const AlertSuccess = ({title, setShow}) => {
    return (
        <Alert variant="success"
               onClose={() => setShow(false)}
               dismissible>
            <Alert.Heading>
                <FontAwesomeIcon icon={faCheck}/> {title}
            </Alert.Heading>
        </Alert>
    )
}

export default AlertSuccess