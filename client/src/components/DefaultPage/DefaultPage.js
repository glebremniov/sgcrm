import React from "react";

import "./DefaultPage.css"
import NavigationBreadcrumb from "../NavigationBreadcrumb/NavigationBreadcrumb";

const DefaultPage = ({title, breadcrumbItems = [], children}) => {
    return (
        <div className="default-page">

            {
                title ? (
                    <div className="title">
                        <h2>{title}</h2>
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