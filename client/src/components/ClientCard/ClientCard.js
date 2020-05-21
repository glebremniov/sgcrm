import React from "react";
import "./ClientCard.css";

const ClientCard = ({data}) => {
    return (
        <div className="client-card shadow">
            <div className="title">
                <h4>{data.shortName}</h4>
            </div>
        </div>
    )
}

export default ClientCard
