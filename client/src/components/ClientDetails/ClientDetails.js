import React, {useContext, useState} from "react";
import "./ClientDetails..css";
import DefaultPage from "../DefaultPage/DefaultPage";
import WithDataWrapper from "../WithDataWrapper/WithDataWrapper";
import {PathServiceContext} from "../../contexts/PathServiceContext";
import ClientDetailsForm from "../ClientDetailsForm/ClientDetailsForm";

const ClientDetails = ({getData}) => {
    const PathService = useContext(PathServiceContext);

    const [title, setTitle] = useState('Загрузка...')
    const [breadcrumbItems, setBreadcrumbItems] = useState([
        PathService.breadcrumbs().home(),
        PathService.breadcrumbs().clients(),
        PathService.breadcrumbs().client('', 'Загрузка...'),
    ])

    const onViewMounted = ({id, shortName}) => {
        if (title !== shortName) {
            setTitle(shortName)
        }

        const breadcrumbItemsCopy = [...breadcrumbItems]
        const indexOfLastElement = breadcrumbItemsCopy.length - 1;

        if (breadcrumbItemsCopy[indexOfLastElement].label !== shortName) {
            breadcrumbItemsCopy[indexOfLastElement] = PathService.breadcrumbs().client(id, shortName)
            setBreadcrumbItems(breadcrumbItemsCopy)
        }
    }

    return (
        <DefaultPage title={title}
                     breadcrumbItems={breadcrumbItems}>
            <div className="client-details">
                <WithDataWrapper
                    getData={getData}
                    onMount={onViewMounted}
                    Component={ClientDetailsForm}
                />
            </div>
        </DefaultPage>
    )
}

export default ClientDetails