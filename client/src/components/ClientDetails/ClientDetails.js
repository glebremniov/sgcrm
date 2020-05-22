import React, {useContext, useEffect, useState} from "react";
import "./ClientDetails..css";
import DefaultPage from "../DefaultPage/DefaultPage";
import WithDataWrapper from "../WithDataWrapper/WithDataWrapper";
import {PathServiceContext} from "../../contexts/PathServiceContext";

const ClientDetails = ({getData}) => {
    const PathService = useContext(PathServiceContext);

    const [title, setTitle] = useState('Загрузка...')
    const [breadcrumbItems, setBreadcrumbItems] = useState([
        PathService.breadCrumbs().home(),
        PathService.breadCrumbs().clients(),
        PathService.breadCrumbs().client('', 'Загрузка...'),
    ])

    const onViewMounted = ({id, shortName}) => {
        if (title !== shortName) {
            setTitle(shortName)
        }

        const breadcrumbItemsCopy = [...breadcrumbItems]
        const indexOfLastElement = breadcrumbItemsCopy.length - 1;

        if (breadcrumbItemsCopy[indexOfLastElement].label !== shortName) {
            breadcrumbItemsCopy[indexOfLastElement] = PathService.breadCrumbs().client(id, shortName)
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
                    Component={ClientDetailsView}
                />
            </div>
        </DefaultPage>
    )
}

export default ClientDetails

const ClientDetailsView = ({data, onMount}) => {

    useEffect(() => {
        onMount(data)
    }, [onMount, data])

    return (
        <div className="client-details-view">

        </div>
    )
}