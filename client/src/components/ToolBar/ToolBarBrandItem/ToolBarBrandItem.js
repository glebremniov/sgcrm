import React from "react";
import "./ToolBarBrandItem.css";
import classNames from "classnames";
import defaultIcon from "./favicon-32x32.png";

const ToolBarBrandItem = ({appIcon}) => {

    const getClassNames = () =>
        classNames('tool-bar-item', 'brand')

    return (
        <div className={getClassNames()}>
            <img src={appIcon || defaultIcon} alt=""/>
        </div>
    )
};

export default ToolBarBrandItem;