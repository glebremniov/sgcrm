import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Col, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faPen, faSave, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import WithClientInfoWrapper from "../ClientInfo/WithClientInfoWrapper";
import ClientGeneralInfo from "../ClientInfo/ClientGeneralInfo";
import ClientAddressInfo from "../ClientInfo/ClientAddressInfo";
import ClientPaymentInfo from "../ClientInfo/ClientPaymentInfo";

const ClientDetailsForm = ({data, onSubmit, onMount}) => {

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
            onSubmit(_getMethodNameByMode(mode), data)
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
                                            onClick={() => setMode(modes.show)}>
                                        <FontAwesomeIcon icon={faBan}/>
                                    </Button>
                                </>
                            )
                    }
                </ButtonGroup>
            </div>

        )
    }

    const readonly = isShowMode(mode)

    return (
        <div className="client-details-view">
            <Form onSubmit={(e) => onSubmitWrapper(e)}>
                {
                    getButtons()
                }

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
                            readonly={readonly}
                            Component={ClientAddressInfo}
                        />
                    </Col>
                </Row>

                <WithClientInfoWrapper
                    title="Платежная информация:"
                    data={data.paymentInfo}
                    readonly={readonly}
                    Component={ClientPaymentInfo}
                />
            </Form>
        </div>
    )
}

export default ClientDetailsForm