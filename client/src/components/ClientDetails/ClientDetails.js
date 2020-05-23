import React, {useContext, useEffect, useState} from "react";
import "./ClientDetails..css";
import DefaultPage from "../DefaultPage/DefaultPage";
import WithDataWrapper from "../WithDataWrapper/WithDataWrapper";
import {PathServiceContext} from "../../contexts/PathServiceContext";
import {Button, Col, Form, Row} from "react-bootstrap";
import ClientGeneralInfo from "../ClientInfo/ClientGeneralInfo/ClientGeneralInfo";
import ClientAddressInfo from "../ClientInfo/ClientAddressInfo/ClientAddressInfo";

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


    //                 paymentInfo: new PaymentInfo(
    //                         bankName: "ЗАО «Альфа-Банк»",
    //                         bankIdentificationCode: "ALFABY2X",
    //                         payerAccountNumber: "190549007",
    //                         checkingAccountNumber: "BY59АКВВ36329000032145100000",
    //                 ),
    //                 mailingAddress: new Address(
    //                         countryISO2code: CountryCode.BY.alpha2,
    //                         state: "Минск",
    //                         city: "Минск",
    //                         postcode: "220012",
    //                         street: "ул. Притыцкого",
    //                         buildingsNumber: "156",
    //                         office: "29",
    //                 ),
    //                 legalAddress: new Address(
    //                         countryISO2code: CountryCode.BY.alpha2,
    //                         state: "Минск",
    //                         city: "Минск",
    //                         postcode: "220012",
    //                         street: "ул. Притыцкого",
    //                         buildingsNumber: "156",
    //                         office: "29",
    //                 ),
    //                 fax: "+375173373700",
    //                 email: "belabat@abatgroup.de",
    //                 clientType: ClientType.ENTITY,
    //                 webSite: "https://www.abat.de/en/belabat",
    //                 isActive: true
    const readonly = true

    return (
        <div className="client-details-view">
            <Form>
                <ClientGeneralInfo title="Общая информация:"
                                   data={data}
                                   readonly={readonly}/>

                <Row>
                    <Col>
                        <ClientAddressInfo title="Юридический адрес:"
                                           data={data.legalAddress}
                                           readonly={readonly}/>
                    </Col>
                    <Col>
                        <ClientAddressInfo title="Почтовый адрес:"
                                           data={data.mailingAddress}
                                           readonly={readonly}/>
                    </Col>
                </Row>


                <Button variant="primary" type="submit">
                    Сохранить
                </Button>
            </Form>
        </div>
    )
}