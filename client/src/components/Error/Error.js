import React from "react";
import "./Error.css";
import {Alert} from "react-bootstrap";
import DefaultPage from "../DefaultPage/DefaultPage";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Error = ({title, text, redirectPath}) => {
    return (
        <DefaultPage>
            <div className="error">
                <Alert variant="danger">
                    <Alert.Heading>
                        <FontAwesomeIcon icon={faExclamationCircle}/> {title}
                    </Alert.Heading>
                    <p>
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
                    </p>
                </Alert>
            </div>
        </DefaultPage>
    );
}

Error.defaultProps = {
    title: "Произошла неизвестная ошибка.",
    text: `Наша команда уже работает над решением возникшей проблемы.`,
    redirectPath: '/'
}

export default Error