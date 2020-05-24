import React, {useContext} from "react";
import "./HomePage.css";
import DefaultPage from "../DefaultPage/DefaultPage";
import {PathServiceContext} from "../../contexts/PathServiceContext";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {Jumbotron} from "react-bootstrap";
import {Link} from "react-router-dom";

const HomePage = ({title}) => {
    const PathService = useContext(PathServiceContext);

    return (
        <DefaultPage title={title}
                     icon={faHome}
                     breadcrumbItems={[PathService.breadcrumbs().home()]}>
            <div className="home-page">
                <div className="text-light">
                    <Jumbotron>
                        <h1>Добро пожаловать!</h1>
                        <p>
                            This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.
                        </p>
                        <p>
                            <Link className="btn btn-lg btn-success" to={PathService.login()}>Войти</Link>
                        </p>
                    </Jumbotron>
                </div>

            </div>
        </DefaultPage>
    )
}

export default HomePage