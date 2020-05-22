import React from "react";
import "./ClientCard.css";

const ClientCard = (props) => {
    const {
        shortName,
        paymentInfo = {},
        legalAddress = {},
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
                    УНП: {paymentInfo.payerAccountNumber}
                </div>
                <div className="item">
                    Тел.: <a href={`tel:${phone}`}>{phone}</a>
                </div>
                <div className="item">
                    E-mail: <a href={`mailto:${email}`}>{email}</a>
                </div>
                <div className="item">
                    Юр. адрес: {legalAddress.addressString}
                </div>
            </div>
        </div>
    )
}

export default ClientCard
