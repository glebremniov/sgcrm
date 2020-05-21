import React from "react";
import "./LoginForm.css";
import DefaultPage from "../DefaultPage/DefaultPage";
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

const LoginForm = (props) => {
    const {
        title,
        onSubmit,
        recoverPasswordPathname,
        userDetails,
        onInputChange
    } = props;

    return (
        <DefaultPage>
            <div className="login-form shadow">

                <div className="title">
                    <h2>{title}</h2>
                </div>

                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Введите имя пользователя:</Form.Label>
                        <Form.Control type="text"
                                      name="username"
                                      value={userDetails.username}
                                      onChange={onInputChange}
                                      autoComplete="username"
                                      placeholder="Имя пользователя"/>
                        <Form.Text className="text-muted">
                            Мы заботимся о конфеденциальности Ваших данных.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Введите пароль:</Form.Label>
                        <Form.Control type="password"
                                      name="password"
                                      value={userDetails.password}
                                      onChange={onInputChange}
                                      autoComplete="current-password"
                                      placeholder="Пароль"/>
                        <Form.Text>
                            <Link to={recoverPasswordPathname}>Забыли пароль?</Link>
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Подтвердить
                    </Button>
                </Form>
            </div>
        </DefaultPage>
    )
}

LoginForm.defaultProps = {
    title: 'Login form',
    onSubmit: (e) => e.preventDefault(),
    recoverPasswordPathname: '/recoverPassword',
    userDetails: {
        username: '',
        password: ''
    },
    onInputChange: () => {
    }
}

export default LoginForm