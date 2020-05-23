import React from "react";
import "./ClientGeneralInfo.css";
import {Col, Form} from "react-bootstrap";

const ClientGeneralInfo = ({title, data, readonly}) => {
    return (
        <div className="client-general-info">
            <div className="title">
                <h4>
                    {title}
                </h4>
            </div>
            <Form.Row>
                <Form.Group as={Col} lg={4} controlId="shortName">
                    <Form.Label>Краткое наименование</Form.Label>
                    <Form.Control name="shortName"
                                  value={data.shortName}
                                  disabled={readonly}
                                  placeholder="Введите краткое наименование"/>
                </Form.Group>

                <Form.Group as={Col} controlId="fullName">
                    <Form.Label>Полное наименование</Form.Label>
                    <Form.Control name="fullName"
                                  value={data.fullName}
                                  disabled={readonly}
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
                                  placeholder="Введите email"/>
                </Form.Group>

                <Form.Group as={Col} controlId="phone">
                    <Form.Label>Телефон</Form.Label>
                    <Form.Control name="phone"
                                  value={data.phone}
                                  disabled={readonly}
                                  placeholder="Телефон"/>
                </Form.Group>

                <Form.Group as={Col} controlId="fax">
                    <Form.Label>Факс</Form.Label>
                    <Form.Control name="fax"
                                  value={data.fax}
                                  disabled={readonly}
                                  placeholder="Факс"/>
                </Form.Group>
            </Form.Row>
        </div>
    )
}

export default ClientGeneralInfo