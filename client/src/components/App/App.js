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
import {CLIENT_VERSION} from "../../config/config";
import HomePage from "../HomePage/HomePage";
import WithDataWrapper from "../WithDataWrapper/WithDataWrapper";
import ClientDetails from "../ClientDetails/ClientDetails";

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

    const filterClients = (dataArr) => {
        return [...dataArr].sort(it => it.isActive ? -1 : 1)
    }

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
                            name: 'sgcrm',
                            version: CLIENT_VERSION
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

                        <RouteWrapper exact path={PathService.home()}
                                      roles={PathService.roles().home()}>
                            <HomePage title="Главная"/>
                        </RouteWrapper>

                        <RouteWrapper exact path={PathService.clients()}
                                      roles={PathService.roles().clients()}>
                            <WithDataWrapper
                                title="Клиенты"
                                getData={ApiService.getClients}
                                Component={ClientsPage}
                                filterData={filterClients}
                            />
                        </RouteWrapper>

                        <RouteWrapper path={PathService.client()}
                                      roles={PathService.roles().client()}>
                            <WithDataWrapper
                                title="Клиент"
                                getData={ApiService.getClient}
                                Component={ClientDetails}
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