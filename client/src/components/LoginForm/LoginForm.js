import React from "react";
import "./LoginForm.css";
import DefaultPage from "../DefaultPage/DefaultPage";
import {Button, Form} from "react-bootstrap";

const LoginForm = (props) => {
    const {
        title,
        onSubmit
    } = props;

    return (
        <DefaultPage>
            <div className="login-form shadow">
                <h2>{title}</h2>

                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Введите имя пользователя:</Form.Label>
                        <Form.Control type="text"
                                      name="username"
                                      placeholder="Имя пользователя"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Введите пароль:</Form.Label>
                        <Form.Control type="password"
                                      name="password"
                                      placeholder="Пароль"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </DefaultPage>
    )
}

LoginForm.defaultProps = {
    title: 'Login form',
    onSubmit: (e) => e.preventDefault()
}

export default LoginForm