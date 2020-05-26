import React from "react";
import "./MeetingForm.css";
import {Button, Col, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {getISODateString} from "../../utils/utils";

const MeetingForm = ({meeting, onSubmit, onChange}) => {
    const {client, date, title} = meeting

    return (
        <div className="meeting-form shadow-sm rounded">
            <div className="title">
                <h4>Новая встреча с клиентом:</h4>
            </div>
            <Form onSubmit={onSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="client">
                        <Form.Label>Клиент</Form.Label>
                        <Form.Control type="text"
                                      required
                                      value={client.shortName}
                                      readOnly/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="date">
                        <Form.Label>Дата и время</Form.Label>
                        <Form.Control type="date"
                                      name="date"
                                      value={date}
                                      required
                                      min={getISODateString()}
                                      onChange={onChange}
                                      placeholder="Выберите дату и время"/>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Название встречи</Form.Label>
                    <Form.Control name="title"
                                  value={title}
                                  required
                                  onChange={onChange}
                                  placeholder="Введите название встречи"/>
                </Form.Group>
                <Button type="submit" variant="primary">
                    <FontAwesomeIcon icon={faSave}/> Сохранить
                </Button>
            </Form>
        </div>
    )
}

export default MeetingForm