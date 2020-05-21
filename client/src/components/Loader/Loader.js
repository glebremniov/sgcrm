import React from "react";

import "./Loader.css"
import loaderIcon from "./Rolling-1s-200px.svg"

const Loader = () => {
    return (
        <div className="loader">
            <img src={loaderIcon} alt="loading.."/>
        </div>
    )
};

export default Loader