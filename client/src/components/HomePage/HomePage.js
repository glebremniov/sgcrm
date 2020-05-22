import React, {useContext} from "react";
import "./HomePage.css";
import DefaultPage from "../DefaultPage/DefaultPage";
import {PathServiceContext} from "../../contexts/PathServiceContext";

const HomePage = ({title}) => {
    const PathService = useContext(PathServiceContext);

    return (
        <DefaultPage title={title}
                     breadcrumbItems={[PathService.breadCrumbs().home()]}>
            <div className="home-page">

            </div>
        </DefaultPage>
    )
}

export default HomePage