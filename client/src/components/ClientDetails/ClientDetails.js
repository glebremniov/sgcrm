import React from "react";
import "./ClientDetails..css";
import DefaultPage from "../DefaultPage/DefaultPage";

const ClientDetails = (props) => {

    const {
        title,
        data
    } = props

    return (
        <DefaultPage>
            <div className="client-details">
                <div className="title">
                    <h3>{title}</h3>
                </div>
            </div>
        </DefaultPage>
    )
}

export default ClientDetails