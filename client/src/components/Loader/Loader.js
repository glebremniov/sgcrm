import React from "react";

import "./Loader.css"
import loaderIcon from "./Dual Ball-0.9s-200px.svg"

const Loader = () => {
    return (
        <div className="loader">
            <img src={loaderIcon} alt="loading.."/>
        </div>
    )
};

export default Loader