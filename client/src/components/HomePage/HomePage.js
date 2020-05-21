import React from "react";
import "./HomePage.css";
import DefaultPage from "../DefaultPage/DefaultPage";

const HomePage = ({title}) => {
    return (
        <DefaultPage>
            <div className="home-page">
                <div className="title">
                    <h2>{title}</h2>
                </div>
            </div>
        </DefaultPage>
    )
}

export default HomePage