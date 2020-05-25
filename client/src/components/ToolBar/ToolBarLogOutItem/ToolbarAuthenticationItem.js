import React from "react";
import classNames from "classnames";

import "./ToolbarAuthenticationItem.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ToolbarAuthenticationItem = ({label, faIcon, onClick, className}) => {
    const getClassNames = () =>
        classNames('tool-bar-item', 'toolbar-authentication-item', ...className)

    return (
        <div className={getClassNames()} onClick={onClick}>
            <FontAwesomeIcon icon={faIcon}/> {label}
        </div>
    )
};

export default ToolbarAuthenticationItem