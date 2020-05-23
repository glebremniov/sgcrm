import React from "react";
import {Breadcrumb} from "react-bootstrap";
import {Link} from "react-router-dom";

const NavigationBreadcrumb = ({items = []}) => {

    if (!items || items.length === 0) {
        return null
    }

    const transformedItems = items.map((it, i) => (
        <Breadcrumb.Item active={i === items.length - 1}
                         key={i}
                         linkAs={Link}
                         linkProps={{to: it.href}}>{it.label}</Breadcrumb.Item>
    ))

    return (
        <Breadcrumb>
            {
                transformedItems
            }
        </Breadcrumb>
    )
}

export default NavigationBreadcrumb