import React from "react";
import {Alert} from "react-bootstrap";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AlertDanger = ({title, text, setShow, redirectPath}) => {
    return (
        <Alert variant="danger"
               onClose={() => setShow(false)}
               dismissible>
            <Alert.Heading>
                <FontAwesomeIcon icon={faExclamationCircle}/> {title}
            </Alert.Heading>
            <div>
                {
                    text
                }
                {
                    redirectPath ?
                        <>
                            <hr/>
                            <div>
                                Вы можете вернуться на <Alert.Link
                                href={redirectPath}>главную</Alert.Link> страницу.
                            </div>
                        </> : null
                }
            </div>
        </Alert>
    );
}

AlertDanger.defaultProps = {
    title: "Во время последней операции произошла ошибка.",
    text: 'Наша команда уже работает над решением возникшей проблемы.',
    redirectPath: '/'
}

export default AlertDanger