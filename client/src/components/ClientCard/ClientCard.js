import React from "react";
import "./ClientCard.css";
import classNames from "classnames"
import {Link} from "react-router-dom";

const ClientCard = (props) => {
    const {
        id,
        shortName,
        paymentInfo = {},
        webSite,
        phone,
        email,
        isActive
    } = props

    const className = classNames('client-card', 'shadow', {
        'active': isActive
    })

    return (
        <div className={className}>
            <div className="title">
                <Link to={`${id}`}>
                    <h3>{shortName}</h3>
                </Link>
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
                    Веб-сайт: <a href={webSite}>{webSite}</a>
                </div>
            </div>
        </div>
    )
}

export default ClientCard
