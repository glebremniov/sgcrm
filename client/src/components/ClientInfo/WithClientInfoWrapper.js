import React from "react";
import "./ClientInfo.css";
import Loader from "../Loader/Loader";

const WithClientInfoWrapper = (props) => {
    const {id = '', data, title = '', Component} = props;
    const buildId = (postfix, prefix = id) => prefix + postfix;

    if (!data) {
        return <Loader/>
    }

    return (
        <div className="client-info">
            <div className="title">
                <h4>
                    {title}
                </h4>
            </div>
            <Component buildId={buildId} {...props}/>
        </div>
    )
}

export default WithClientInfoWrapper