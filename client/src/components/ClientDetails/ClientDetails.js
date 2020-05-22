import React from "react";
import "./ClientDetails..css";
import DefaultPage from "../DefaultPage/DefaultPage";
import NavigationBreadcrumb from "../NavigationBreadcrumb/NavigationBreadcrumb";

const ClientDetails = (props) => {
    const {
        data
    } = props

    const {
        id,
        shortName
    } = data

    return (
        <DefaultPage>
            <div className="client-details">
                <div className="title">
                    <h2>{shortName}</h2>
                </div>

                <NavigationBreadcrumb
                    items={[
                        {href: '/', label: 'Главная'},
                        {href: '/clients/', label: 'Клиенты'},
                        {href: `/clients/${id}`, label: shortName},
                    ]}
                />

            </div>
        </DefaultPage>
    )
}

export default ClientDetails