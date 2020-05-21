import React from "react";
import "./ClientCard.css";

const ClientCard = (props) => {
    const {
        shortName
    } = props
    return (
        <div className="client-card shadow">
            <div className="title">
                <h4>{shortName}</h4>
            </div>
        </div>
    )
}

export default ClientCard
