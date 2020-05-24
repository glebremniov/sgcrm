import React from "react";
import {Alert} from "react-bootstrap";

const AlertSuccess = ({title, setShow}) => {
    return (
        <Alert variant="success"
               onClose={() => setShow(false)}
               dismissible>
            <Alert.Heading>{title}</Alert.Heading>
        </Alert>
    )
}

export default AlertSuccess