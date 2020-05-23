import React from "react";
import {Col, Form} from "react-bootstrap";
import countryList from "react-select-country-list";

const ClientAddressInfo = ({data, buildId, readonly}) => {
    const countries = countryList().getData() || []

    return (
        <div className="client-address-info">
            <Form.Group controlId={buildId("address")}>
                <Form.Label>Адрес</Form.Label>
                <Form.Control
                    name="address"
                    value={data.addressString}
                    disabled={readonly}
                    placeholder="Введите адрес"/>
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId={buildId("city")}>
                    <Form.Label>Город</Form.Label>
                    <Form.Control
                        name="city"
                        value={data.city}
                        disabled={readonly}
                        placeholder="Введите город"
                    />
                </Form.Group>

                <Form.Group as={Col} controlId={buildId("country")}>
                    <Form.Label>Страна</Form.Label>
                    <Form.Control as="select"
                                  name="country"
                                  disabled={readonly}
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
                        placeholder="Индекс"/>
                </Form.Group>
            </Form.Row>
        </div>
    )
}

export default ClientAddressInfo