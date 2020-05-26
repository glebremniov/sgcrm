import React, {useContext, useState} from "react";
import "./ClientDetails..css";
import DefaultPage from "../DefaultPage/DefaultPage";
import WithDataWrapper from "../WithDataWrapper/WithDataWrapper";
import {PathServiceContext} from "../../contexts/PathServiceContext";
import ClientDetailsForm from "../ClientDetailsForm/ClientDetailsForm";
import {faWallet} from "@fortawesome/free-solid-svg-icons";

const ClientDetails = (props) => {
    const {getData} = props
    const PathService = useContext(PathServiceContext);

    const [title, setTitle] = useState('Загрузка...')
    const [breadcrumbItems, setBreadcrumbItems] = useState([
        PathService.breadcrumbs().home(),
        PathService.breadcrumbs().clients(),
        PathService.breadcrumbs().client('', 'Загрузка...'),
    ])

    const onViewMounted = (data) => {
        const newTitle = data.id ? data.shortName : props.title

        if (title !== newTitle) {
            setTitle(newTitle)
        }

        const breadcrumbItemsCopy = [...breadcrumbItems]
        const indexOfLastElement = breadcrumbItemsCopy.length - 1;

        if (breadcrumbItemsCopy[indexOfLastElement].label !== newTitle) {
            breadcrumbItemsCopy[indexOfLastElement] = data.id ?
                PathService.breadcrumbs().client(data.id, data.shortName) :
                PathService.breadcrumbs().newClient()
            setBreadcrumbItems(breadcrumbItemsCopy)
        }
    }

    return (
        <DefaultPage title={title}
                     icon={faWallet}
                     breadcrumbItems={breadcrumbItems}>
            <div className="client-details">
                {getData ? (
                        <WithDataWrapper
                            getData={getData}
                            onMount={onViewMounted}
                            Component={ClientDetailsForm}
                        />
                    ) :
                    <ClientDetailsForm
                        data={undefined}
                        onMount={onViewMounted}
                    />
                }
            </div>
        </DefaultPage>
    )
}

export default ClientDetails