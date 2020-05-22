import React from "react";
import "./ClientsPage.css";
import DefaultPage from "../DefaultPage/DefaultPage";
import ClientCard from "../ClientCard/ClientCard";
import RowDataTransformer from "../RowDataContainer/RowDataTransformer";
import PropTypes from "prop-types";
import NavigationBreadcrumb from "../NavigationBreadcrumb/NavigationBreadcrumb";

const ClientsPage = (props) => {
    const {
        title,
        data,
        filterData
    } = props

    return (
        <DefaultPage>
            <div className="clients-page">
                <div className="title">
                    <h2>{title}</h2>
                </div>

                <NavigationBreadcrumb
                    items={[
                        {href: '/', label: 'Главная'},
                        {href: '/clients/', label: 'Клиенты'},
                    ]}
                />

                <RowDataTransformer
                    dataArr={filterData(data)}
                    CardComponent={ClientCard}/>

            </div>
        </DefaultPage>
    )
}

ClientsPage.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
}

ClientsPage.defaultProps = {
    title: '',
    data: [],
}

export default ClientsPage


