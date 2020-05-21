import React from "react";
import "./ClientCard.css";

const ClientCard = (props) => {
    const {
        shortName,
        phone,
        email
    } = props
    
    return (
        <div className="client-card shadow">
            <div className="title">
                <h4>{shortName}</h4>
            </div>
            <hr/>
            <div className="body">
                <div className="item">
                    УНП:
                </div>
                <div className="item">
                    Тел.: <a href={`tel:${phone}`}>{phone}</a>
                </div>
                <div className="item">
                    E-mail: <a href={`mailto:${email}`}>{email}</a>
                </div>
                <div className="item">
                    Юр. адрес:
                </div>
            </div>
        </div>
    )
}

export default ClientCard
