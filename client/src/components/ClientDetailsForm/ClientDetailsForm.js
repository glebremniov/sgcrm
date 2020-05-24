import React, {useEffect, useState} from "react";
import {Col, Form, Row} from "react-bootstrap";
import {faBan, faPen, faSave, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import WithClientInfoWrapper from "../ClientInfo/WithClientInfoWrapper";
import ClientGeneralInfo from "../ClientInfo/ClientGeneralInfo";
import ClientAddressInfo from "../ClientInfo/ClientAddressInfo";
import ClientPaymentInfo from "../ClientInfo/ClientPaymentInfo";
import ButtonBar from "../ButtonBar/ButtonBar";
import ApiService from "../../services/Api/ApiService";
import AlertSuccess from "../AlertSuccess/AlertSuccess";

const ClientDetailsForm = ({data, reload, onMount}) => {

    const modes = {
        show: 'show',
        edit: 'edit',
        create: 'create'
    }

    const [generalInfo, setGeneralInfo] = useState(data)
    const [legalAddressInfo, setLegalAddressInfo] = useState(data.legalAddress)
    const [mailingAddressInfo, setMailingAddressInfo] = useState(data.mailingAddress)
    const [paymentInfo, setPaymentInfo] = useState(data.paymentInfo)
    const [mode, setMode] = useState(modes.show)
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)

    useEffect(() => {
        onMount(data)
    }, [onMount, data])

    const isShowMode = (modeName) => modes[modeName] && modes[modeName] === modes.show
    const isEditMode = (modeName) => modes[modeName] && modes[modeName] === modes.edit
    const isCreateMode = (modeName) => modes[modeName] && modes[modeName] === modes.create

    const equals = (obj1, obj2) => {
        return Object.entries(obj1).toString() === Object.entries(obj2).toString()
    }

    const clientNotChanged = () =>
        equals(data, generalInfo) &&
        equals(data.legalAddress, legalAddressInfo) &&
        equals(data.mailingAddress, mailingAddressInfo) &&
        equals(data.paymentInfo, paymentInfo)


    const onSubmitWrapper = (e) => {
        e.preventDefault()

        const onSuccess = (json) => {
            setShowAlertSuccess(true)
            setMode(modes.show)
            reload()
            window.scrollTo(0, 0)
        }

        const onError = (error) => {
            console.error(e)
            setShowAlertSuccess(false)
        }

        if (!isShowMode(mode)) {
            const client = {
                ...generalInfo,
                legalAddress: legalAddressInfo,
                mailingAddress: mailingAddressInfo,
                paymentInfo: paymentInfo
            }

            if (isCreateMode(mode)) {
                console.debug('post')
                ApiService.saveClient(client)
                    .then(onSuccess)
                    .catch(onError)

            } else if (isEditMode(mode)) {
                ApiService.updateClient(client.id, client)
                    .then(onSuccess)
                    .catch(onError)
            }
        }
    }

    const getButtons = () => {
        if (isShowMode(mode)) {
            return [
                {
                    id: 'edit',
                    variant: 'outline-primary',
                    type: 'button',
                    icon: faPen,
                    tooltip: '',
                    label: 'Изменить',
                    onClick: () => setMode(modes.edit),
                },
                {
                    id: 'delete',
                    variant: 'outline-danger',
                    type: 'button',
                    icon: faTrashAlt,
                    tooltip: 'Удалить',
                    label: '',
                },
            ]
        } else {
            return [
                {
                    id: 'edit',
                    variant: "primary",
                    type: "submit",
                    icon: faSave,
                    disabled: clientNotChanged(),
                    tooltip: '',
                    label: 'Сохранить',
                },
                {
                    id: 'cancel',
                    variant: "outline-secondary",
                    type: "reset",
                    icon: faBan,
                    label: '',
                    tooltip: 'Отменить',
                    onClick: onCancel,
                },
            ]
        }
    }

    const onCancel = () => {
        setMode(modes.show)
        setGeneralInfo(data)
        setLegalAddressInfo(data.legalAddress)
        setMailingAddressInfo(data.mailingAddress)
        setPaymentInfo(data.paymentInfo)
    }

    const onInputChange = (target, object) => {
        if (object.hasOwnProperty(target.name)) {
            const objectCopy = {...object}
            objectCopy[target.name] = target.value
            return objectCopy
        }
        console.error('Unknown property', target.name, object)
    }

    const onGeneralInfoInputChange = ({target}) => {
        const copy = onInputChange(target, generalInfo);
        if (copy) {
            setGeneralInfo(copy)
        }
    }

    const onLegalAddressInfoInputChange = ({target}) => {
        const copy = onInputChange(target, legalAddressInfo);
        if (copy) {
            setLegalAddressInfo(copy)
        }
    }

    const onMailingAddressInfoInputChange = ({target}) => {
        const copy = onInputChange(target, mailingAddressInfo);
        if (copy) {
            setMailingAddressInfo(copy)
        }
    }

    const onPaymentInfoInputChange = ({target}) => {
        const copy = onInputChange(target, paymentInfo);
        if (copy) {
            setPaymentInfo(copy)
        }
    }

    const readonly = isShowMode(mode);

    return (
        <div className="client-details-view">

            {
                showAlertSuccess ? (
                    <AlertSuccess title="Данные успешно сохранены!"
                                  setShow={setShowAlertSuccess}/>
                ) : null
            }

            <Form onSubmit={(e) => onSubmitWrapper(e)}>
                <ButtonBar buttons={getButtons()}/>

                <WithClientInfoWrapper
                    title="Общая информация:"
                    data={generalInfo}
                    readonly={readonly}
                    onInputChange={onGeneralInfoInputChange}
                    Component={ClientGeneralInfo}
                />

                <Row>
                    <Col>
                        <WithClientInfoWrapper
                            title="Юридический адрес:"
                            id="legalAddress"
                            data={legalAddressInfo}
                            readonly={readonly}
                            onInputChange={onLegalAddressInfoInputChange}
                            Component={ClientAddressInfo}
                        />
                    </Col>
                    <Col>
                        <WithClientInfoWrapper
                            title="Почтовый адрес:"
                            id="mailingAddress"
                            data={mailingAddressInfo}
                            readonly={readonly}
                            onInputChange={onMailingAddressInfoInputChange}
                            Component={ClientAddressInfo}
                        />
                    </Col>
                </Row>

                <WithClientInfoWrapper
                    title="Платежная информация:"
                    id="paymentInfo"
                    data={paymentInfo}
                    readonly={readonly}
                    onInputChange={onPaymentInfoInputChange}
                    Component={ClientPaymentInfo}
                />
            </Form>
        </div>
    )
}

export default ClientDetailsForm