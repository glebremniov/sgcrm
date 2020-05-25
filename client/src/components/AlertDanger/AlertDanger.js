import React, {useContext} from "react";
import {Alert} from "react-bootstrap";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {PathServiceContext} from "../../contexts/PathServiceContext";
import {Link} from "react-router-dom";

const AlertDanger = ({title, text, setShow, redirectPath}) => {

    const PathService = useContext(PathServiceContext)

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
                <hr/>
                <div>
                    Вы можете вернуться на <Alert.Link
                    as={Link}
                    to={redirectPath || PathService.home()}
                >главную</Alert.Link> страницу.
                </div>
            </div>
        </Alert>
    );
}

AlertDanger.defaultProps = {
    title: "Во время последней операции произошла ошибка.",
    text: 'Наша команда уже работает над решением возникшей проблемы.',
}

export default AlertDanger