import React, {useContext} from "react";
import "./ClientsPage.css";
import DefaultPage from "../DefaultPage/DefaultPage";
import ClientCard from "../ClientCard/ClientCard";
import RowDataTransformer from "../RowDataContainer/RowDataTransformer";
import PropTypes from "prop-types";
import WithDataWrapper from "../WithDataWrapper/WithDataWrapper";
import {PathServiceContext} from "../../contexts/PathServiceContext";
import {faWallet} from "@fortawesome/free-solid-svg-icons";

const ClientsPage = (props) => {
    const {
        title,
        filterData,
        getData
    } = props

    const PathService = useContext(PathServiceContext)

    return (
        <DefaultPage title={title}
                     icon={faWallet}
                     breadcrumbItems={[
                         PathService.breadcrumbs().home(),
                         PathService.breadcrumbs().clients(),
                     ]}>
            <div className="clients-page">

                <WithDataWrapper
                    getData={getData}
                    filterData={filterData}
                    Component={RowDataTransformer}
                    CardComponent={ClientCard}
                />

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


