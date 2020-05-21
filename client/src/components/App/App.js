import React, {useEffect, useState} from "react";
import "./App.css";
import AppService from "../../services/App/AppService";
import ToolBar from "../ToolBar/ToolBar/ToolBar";
import {BrowserRouter} from "react-router-dom";
import {UserDetailsContext} from "../../contexts/UserDetailsContext"
import DefaultPage from "../DefaultPage/DefaultPage";
import Panel from "../Panel/Panel";
import AuthService from "../../services/Auth/AuthService";
import RouteWrapper from "../RouteWrapper/RouteWrapper";
import PathService from "../../services/Path/PathService";
import LoginForm from "../LoginForm/LoginForm";
import ClientsPage from "../ClientsPage/ClientsPage";
import ApiService from "../../services/Api/ApiService";

const App = () => {

    const [userDetails, setUserDetails] = useState(AppService.getInitialUserDetails());
    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const setUserRole = (role) => {
            if (userDetails.role !== role) {
                setUserDetails({...userDetails, role})
            }
        }

        AuthService.checkAuthentication(setAuthenticated, setUserRole)

    }, [userDetails])

    const onLoginFormInputChange = ({target}) => {
        const newUserDetails = {...userDetails}
        newUserDetails[target.name] = target.value
        setUserDetails(newUserDetails)
    }

    const onLoginFormSubmit = (event) => {
        event.preventDefault()
        AuthService.login(userDetails)
    }

    const onLogout = () => {
        AuthService.removeToken();
        setAuthenticated(false)
        setUserDetails(AppService.getInitialUserDetails())
    };

    return (
        <div className="app">
            <UserDetailsContext.Provider value={{
                username: userDetails.username,
                role: userDetails.role
            }}>
                <BrowserRouter>

                    <ToolBar {...AppService.getToolBarProps(
                        isAuthenticated,
                        userDetails,
                        {
                            name: 'sgcrm'
                        },
                        onLogout,
                    )}/>

                    <Panel>

                        <RouteWrapper path={PathService.login()}
                                      roles={PathService.roles().login()}>
                            <LoginForm
                                title="Авторизация"
                                userDetails={userDetails}
                                onSubmit={onLoginFormSubmit}
                                onInputChange={onLoginFormInputChange}
                            />
                        </RouteWrapper>

                        <RouteWrapper path={PathService.home()} exact
                                      roles={PathService.roles().home()}>
                            <DefaultPage>
                                Главная
                            </DefaultPage>
                        </RouteWrapper>

                        <RouteWrapper path={PathService.clients()}
                                      roles={PathService.roles().clients()}>
                            <ClientsPage
                                getData={ApiService.getClients}
                            />
                        </RouteWrapper>

                        <RouteWrapper path={PathService.operations()}
                                      roles={PathService.roles().operations()}>
                            <DefaultPage>
                                Operations
                            </DefaultPage>
                        </RouteWrapper>

                        <RouteWrapper path={PathService.workers()}
                                      roles={PathService.roles().workers()}>
                            <DefaultPage>
                                Workers
                            </DefaultPage>
                        </RouteWrapper>

                        <RouteWrapper path={PathService.settings()}
                                      roles={PathService.roles().settings()}>
                            <DefaultPage>
                                Settings
                            </DefaultPage>
                        </RouteWrapper>

                    </Panel>

                </BrowserRouter>
            </UserDetailsContext.Provider>
        </div>
    )
}

export default App