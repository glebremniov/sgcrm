import React from "react";
import "./ClientDetails..css";
import DefaultPage from "../DefaultPage/DefaultPage";

const ClientDetails = (props) => {
    const {
        data
    } = props

    const {
        shortName
    } = data

    return (
        <DefaultPage>
            <div className="client-details">
                <div className="title">
                    <h3>{shortName}</h3>
                </div>
            </div>
        </DefaultPage>
    )
}

export default ClientDetails