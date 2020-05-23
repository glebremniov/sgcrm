import React, {useContext} from "react";
import "./HomePage.css";
import DefaultPage from "../DefaultPage/DefaultPage";
import {PathServiceContext} from "../../contexts/PathServiceContext";
import {faHome} from "@fortawesome/free-solid-svg-icons";

const HomePage = ({title}) => {
    const PathService = useContext(PathServiceContext);

    return (
        <DefaultPage title={title}
                     icon={faHome}
                     breadcrumbItems={[PathService.breadcrumbs().home()]}>
            <div className="home-page">

            </div>
        </DefaultPage>
    )
}

export default HomePage