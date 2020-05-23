import React from "react";

import "./DefaultPage.css"
import NavigationBreadcrumb from "../NavigationBreadcrumb/NavigationBreadcrumb";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

const DefaultPage = ({title, icon, breadcrumbItems = [], children}) => {
    return (
        <div className="default-page">

            {
                title ? (
                    <div className="title">
                        <h2>
                            <span className="text-primary">
                                <FontAwesomeIcon icon={icon || faCheck}/>
                            </span> {title}
                        </h2>
                    </div>
                ) : null
            }

            {
                breadcrumbItems.length ? (
                    <div className="mt-4">
                        <NavigationBreadcrumb items={breadcrumbItems}/>
                    </div>
                ) : null
            }

            {children}
        </div>
    )
};

export default DefaultPage