import React from "react";
import "./StatusBar.css";

const StatusBar = ({appInfo}) => {
    return (
        <div className="status-bar">
            <div className="left">
                v. {appInfo.version}
            </div>
        </div>
    )
};

export default StatusBar