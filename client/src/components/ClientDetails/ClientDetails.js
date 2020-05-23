import React, {useContext, useEffect, useState} from "react";
import "./ClientDetails..css";
import DefaultPage from "../DefaultPage/DefaultPage";
import WithDataWrapper from "../WithDataWrapper/WithDataWrapper";
import {PathServiceContext} from "../../contexts/PathServiceContext";
import {Button, Col, Form, Row} from "react-bootstrap";
import ClientGeneralInfo from "../ClientInfo/ClientGeneralInfo";
import ClientAddressInfo from "../ClientInfo/ClientAddressInfo";
import WithClientInfoWrapper from "../ClientInfo/WithClientInfoWrapper";
import ClientPaymentInfo from "../ClientInfo/ClientPaymentInfo";

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

    const readonly = false

    return (
        <div className="client-details-view">
            <Form>
                <WithClientInfoWrapper
                    title="Общая информация:"
                    data={data}
                    readonly={readonly}
                    Component={ClientGeneralInfo}
                />

                <Row>
                    <Col>
                        <WithClientInfoWrapper
                            title="Юридический адрес:"
                            id="legal-"
                            data={data.legalAddress}
                            readonly={readonly}
                            Component={ClientAddressInfo}
                        />
                    </Col>
                    <Col>
                        <WithClientInfoWrapper
                            title="Почтовый адрес:"
                            id="mailing-"
                            data={data.mailingAddress}
                            Component={ClientAddressInfo}
                        />
                    </Col>
                </Row>

                <WithClientInfoWrapper
                    title="Платежная информация:"
                    data={data.paymentInfo}
                    Component={ClientPaymentInfo}
                />


                <Button variant="primary" type="submit">
                    Сохранить
                </Button>
            </Form>
        </div>
    )
}