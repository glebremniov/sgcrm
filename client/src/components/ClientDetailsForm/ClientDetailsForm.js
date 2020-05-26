import React, {useContext, useEffect, useState} from "react";
import {Col, Form, Row} from "react-bootstrap";
import {faBan, faCalendarAlt, faPen, faSave, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import WithClientInfoWrapper from "../ClientInfo/WithClientInfoWrapper";
import ClientGeneralInfo from "../ClientInfo/ClientGeneralInfo";
import ClientAddressInfo from "../ClientInfo/ClientAddressInfo";
import ClientPaymentInfo from "../ClientInfo/ClientPaymentInfo";
import ButtonBar from "../ButtonBar/ButtonBar";
import ApiService from "../../services/Api/ApiService";
import AlertSuccess from "../AlertSuccess/AlertSuccess";
import AlertDanger from "../AlertDanger/AlertDanger";
import {PathServiceContext} from "../../contexts/PathServiceContext";
import history from "../../history";
import {onInputChange} from "../../handlers/inputHandlers";
import MeetingFormWrapper from "../MeetingFormWrapper/MeetingFormWrapper";

const ClientDetailsForm = ({data, reload, onMount}) => {

    const PathService = useContext(PathServiceContext)

    const modes = {
        show: 'show',
        edit: 'edit',
        create: 'create'
    }

    const INITIAL_ERROR_STATE = {hasError: false, message: ''}

    const [generalInfo, setGeneralInfo] = useState(data)
    const [legalAddressInfo, setLegalAddressInfo] = useState(data.legalAddress)
    const [mailingAddressInfo, setMailingAddressInfo] = useState(data.mailingAddress)
    const [paymentInfo, setPaymentInfo] = useState(data.paymentInfo)
    const [mode, setMode] = useState(modes.show)
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)
    const [showMeetingForm, setSetShowMeetingForm] = useState(false)
    const [error, setError] = useState(INITIAL_ERROR_STATE)

    useEffect(() => {
        onMount(data)
        if (!data.id && mode !== modes.create) {
            setMode(modes.create)
        }
    }, [onMount, data, mode, modes.create])

    const isShowMode = (modeName) => modes[modeName] && modes[modeName] === modes.show
    const isEditMode = (modeName) => modes[modeName] && modes[modeName] === modes.edit
    const isCreateMode = (modeName) => modes[modeName] && modes[modeName] === modes.create

    const equals = (obj1, obj2) => {
        return Object.entries(obj1).toString() === Object.entries(obj2).toString()
    }

    const hideAlertDanger = () => {
        setError(INITIAL_ERROR_STATE)
    }

    const clientNotChanged = () =>
        equals(data, generalInfo) &&
        equals(data.legalAddress, legalAddressInfo) &&
        equals(data.mailingAddress, mailingAddressInfo) &&
        equals(data.paymentInfo, paymentInfo)


    const onSubmitWrapper = (e) => {
        e.preventDefault()

        const onSuccess = (response) => {
            hideAlertDanger()
            setShowAlertSuccess(true)
            setMode(modes.show)
            window.scrollTo(0, 0)
            response.json()
                .then(reload)
        }

        const onError = (e) => {
            console.error(e)
            if (e.response) {
                e.response.json()
                    .then(json => {
                        console.error(json.message);
                        setError({
                            hasError: true,
                            message: json.message
                        })
                    })
                    .catch(console.error)
            }
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
                ApiService.saveClient(client)
                    .then(response => response.json()
                        .then(({id}) =>
                            history.push(PathService.buildPathToClient(id))))
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
                    id: 'meeting',
                    variant: 'outline-primary',
                    type: 'button',
                    icon: faCalendarAlt,
                    tooltip: '',
                    label: 'Запланировать встречу',
                    onClick: () => setSetShowMeetingForm(!showMeetingForm),
                },
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
        setShowAlertSuccess(false)
        hideAlertDanger()
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

            {
                error.hasError ? (
                    <AlertDanger text={error.message}
                                 setShow={hideAlertDanger}/>
                ) : null
            }

            {
                showMeetingForm ? (
                    <MeetingFormWrapper client={generalInfo}
                                        showSuccessAlert={setShowAlertSuccess}
                                        showErrorAlert={setError}
                                        setShow={setSetShowMeetingForm}/>
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

ClientDetailsForm.defaultProps = {
    data: {
        shortName: "",
        fullName: "",
        phone: "",
        email: "",
        fax: "",
        legalAddress: {
            addressString: "",
            city: "",
            countryISO2code: "BY",
            postcode: "",
        },
        mailingAddress: {
            addressString: "",
            city: "",
            countryISO2code: "BY",
            postcode: "",
        },
        paymentInfo: {
            bankIdentificationCode: "",
            bankName: "",
            checkingAccountNumber: "",
            payerAccountNumber: "",
        }
    }
}

export default ClientDetailsForm