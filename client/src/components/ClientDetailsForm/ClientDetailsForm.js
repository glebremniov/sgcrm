import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Col, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faPen, faSave, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import WithClientInfoWrapper from "../ClientInfo/WithClientInfoWrapper";
import ClientGeneralInfo from "../ClientInfo/ClientGeneralInfo";
import ClientAddressInfo from "../ClientInfo/ClientAddressInfo";
import ClientPaymentInfo from "../ClientInfo/ClientPaymentInfo";

const ClientDetailsForm = ({data, onSubmit, onMount}) => {

    const [generalInfo, setGeneralInfo] = useState(data)
    const [legalAddressInfo, setLegalAddressInfo] = useState(data.legalAddress)
    const [mailingAddressInfo, setMailingAddressInfo] = useState(data.mailingAddress)
    const [paymentInfo, setPaymentInfo] = useState(data.paymentInfo)

    useEffect(() => {
        onMount(data)
    }, [onMount, data])

    const modes = {
        show: 'show',
        edit: 'edit',
        create: 'create'
    }

    const isShowMode = (modeName) => modes[modeName] && modes[modeName] === 'show'
    const isEditMode = (modeName) => modes[modeName] && modes[modeName] === 'edit'
    const isCreateMode = (modeName) => modes[modeName] && modes[modeName] === 'create'

    const [mode, setMode] = useState(modes.show)

    const onSubmitWrapper = (e) => {
        e.preventDefault()

        const _getMethodNameByMode = (mode) => {
            if (isEditMode(mode)) {
                return 'put'
            } else if (isCreateMode(mode)) {
                return 'post'
            }
            return null
        }

        if (!isShowMode(mode)) {
            onSubmit(_getMethodNameByMode(mode), {
                ...generalInfo,
                legalAddress: legalAddressInfo,
                mailingAddress: mailingAddressInfo,
                paymentInfo: paymentInfo
            })
        }
    }

    const getButtons = () => {
        return (
            <div className="float-right">
                <ButtonGroup aria-label="Basic example">
                    {
                        isShowMode(mode) ?
                            (
                                <>
                                    <Button variant="outline-primary"
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setMode(modes.edit)
                                            }}>
                                        <FontAwesomeIcon icon={faPen}/> Изменить
                                    </Button>
                                    <Button variant="outline-danger">
                                        <FontAwesomeIcon icon={faTrashAlt}/>
                                    </Button>
                                </>

                            ) :
                            (
                                <>
                                    <Button variant="primary"
                                            type="submit">
                                        <FontAwesomeIcon icon={faSave}/> Сохранить
                                    </Button>
                                    <Button variant="outline-secondary"
                                            onClick={() => {
                                                setMode(modes.show)
                                                setGeneralInfo(data)
                                                setLegalAddressInfo(data.legalAddress)
                                                setMailingAddressInfo(data.mailingAddress)
                                                setPaymentInfo(data.paymentInfo)
                                            }}>
                                        <FontAwesomeIcon icon={faBan}/>
                                    </Button>
                                </>
                            )
                    }
                </ButtonGroup>
            </div>

        )
    }

    const readonly = isShowMode(mode);

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

    return (
        <div className="client-details-view">
            <Form onSubmit={(e) => onSubmitWrapper(e)}>
                {
                    getButtons()
                }

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