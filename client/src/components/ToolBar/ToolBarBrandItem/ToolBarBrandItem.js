import React from "react";
import "./ToolBarBrandItem.css";
import classNames from "classnames";

const ToolBarBrandItem = ({appName = 'App'}) => {

    const getClassNames = () =>
        classNames('tool-bar-item', 'brand', 'noselect')

    return (
        <div className={getClassNames()}>
            <span>{appName}</span>
        </div>
    )
};

export default ToolBarBrandItem;