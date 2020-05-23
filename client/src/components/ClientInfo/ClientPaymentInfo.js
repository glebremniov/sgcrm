import React from "react";
import {Col, Form} from "react-bootstrap";

const ClientPaymentInfo = ({data, readonly}) => {
    return (
        <div className="client-payment-info">
            <Form.Row>
                <Form.Group as={Col} controlId="bankName">
                    <Form.Label>Наименование банка</Form.Label>
                    <Form.Control name="bankName"
                                  value={data.bankName}
                                  disabled={readonly}
                                  placeholder="Введите наименование банка"/>
                </Form.Group>

                <Form.Group as={Col} lg={4} controlId="bankIdentificationCode">
                    <Form.Label>БИК</Form.Label>
                    <Form.Control name="bankIdentificationCode"
                                  value={data.bankIdentificationCode}
                                  disabled={readonly}
                                  placeholder="Введите БИК"/>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="payerAccountNumber">
                    <Form.Label>Уникальный номер плательщика (УНП)</Form.Label>
                    <Form.Control name="payerAccountNumber"
                                  value={data.payerAccountNumber}
                                  disabled={readonly}
                                  type="payerAccountNumber"
                                  placeholder="Введите УНП"/>
                </Form.Group>

                <Form.Group as={Col} controlId="checkingAccountNumber">
                    <Form.Label>Рассчетный счёт</Form.Label>
                    <Form.Control name="checkingAccountNumber"
                                  value={data.checkingAccountNumber}
                                  disabled={readonly}
                                  placeholder="Введите рассчетный счёт"/>
                </Form.Group>
            </Form.Row>
        </div>
    )
}

export default ClientPaymentInfo