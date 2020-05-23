import React from "react";
import {Col, Form} from "react-bootstrap";

const ClientGeneralInfo = ({data, readonly, onInputChange}) => {
    return (
        <div className="client-general-info">
            <Form.Row>
                <Form.Group as={Col} lg={4} controlId="shortName">
                    <Form.Label>Краткое наименование</Form.Label>
                    <Form.Control name="shortName"
                                  value={data.shortName}
                                  disabled={readonly}
                                  onChange={onInputChange}
                                  placeholder="Введите краткое наименование"/>
                </Form.Group>

                <Form.Group as={Col} controlId="fullName">
                    <Form.Label>Полное наименование</Form.Label>
                    <Form.Control name="fullName"
                                  value={data.fullName}
                                  disabled={readonly}
                                  onChange={onInputChange}
                                  placeholder="Введите полное наименование"/>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email"
                                  value={data.email}
                                  disabled={readonly}
                                  type="email"
                                  onChange={onInputChange}
                                  placeholder="Введите email"/>
                </Form.Group>

                <Form.Group as={Col} controlId="phone">
                    <Form.Label>Телефон</Form.Label>
                    <Form.Control name="phone"
                                  value={data.phone}
                                  disabled={readonly}
                                  onChange={onInputChange}
                                  placeholder="Телефон"/>
                </Form.Group>

                <Form.Group as={Col} controlId="fax">
                    <Form.Label>Факс</Form.Label>
                    <Form.Control name="fax"
                                  value={data.fax}
                                  disabled={readonly}
                                  onChange={onInputChange}
                                  placeholder="Факс"/>
                </Form.Group>
            </Form.Row>
        </div>
    )
}

export default ClientGeneralInfo