import React from "react";
import {Col, Form} from "react-bootstrap";
import countryList from "react-select-country-list";

const ClientAddressInfo = ({data, buildId, onInputChange, readonly}) => {
    const countries = countryList().getData() || []

    return (
        <div className="client-address-info">
            <Form.Group controlId={buildId("addressString")}>
                <Form.Label>Адрес</Form.Label>
                <Form.Control
                    name="addressString"
                    value={data.addressString}
                    disabled={readonly}
                    onChange={onInputChange}
                    placeholder="Введите адрес"/>
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId={buildId("city")}>
                    <Form.Label>Город</Form.Label>
                    <Form.Control
                        name="city"
                        value={data.city}
                        disabled={readonly}
                        onChange={onInputChange}
                        placeholder="Введите город"
                    />
                </Form.Group>

                <Form.Group as={Col} controlId={buildId("countryISO2code")}>
                    <Form.Label>Страна</Form.Label>
                    <Form.Control as="select"
                                  name="countryISO2code"
                                  disabled={readonly}
                                  onChange={onInputChange}
                                  value={data.countryISO2code}>
                        {
                            countries.map((it, i) => (
                                <option key={i} value={it.value}>{it.label}</option>
                            ))
                        }
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} lg={3} controlId={buildId("postcode")}>
                    <Form.Label>Индекс</Form.Label>
                    <Form.Control
                        name="postcode"
                        value={data.postcode}
                        disabled={readonly}
                        onChange={onInputChange}
                        placeholder="Индекс"/>
                </Form.Group>
            </Form.Row>
        </div>
    )
}

export default ClientAddressInfo