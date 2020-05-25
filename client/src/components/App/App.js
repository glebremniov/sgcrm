import React, {useCallback, useEffect, useState} from "react";
import "./App.css";
import AppService from "../../services/App/AppService";
import ToolBar from "../ToolBar/ToolBar/ToolBar";
import {Router} from "react-router-dom";
import {UserDetailsContext} from "../../contexts/UserDetailsContext"
import DefaultPage from "../DefaultPage/DefaultPage";
import Panel from "../Panel/Panel";
import AuthService from "../../services/Auth/AuthService";
import Auth from "../../services/Auth/AuthService";
import RouteWrapper from "../RouteWrapper/RouteWrapper";
import PathService from "../../services/Path/PathService";
import LoginForm from "../LoginForm/LoginForm";
import ClientsPage from "../ClientsPage/ClientsPage";
import ApiService from "../../services/Api/ApiService";
import {APP_NAME, CLIENT_VERSION} from "../../config/config";
import HomePage from "../HomePage/HomePage";
import ClientDetails from "../ClientDetails/ClientDetails";
import RoleService from "../../services/Role/RoleService";
import {PathServiceContext} from "../../contexts/PathServiceContext";
import {faBox, faCalendarAlt, faCog} from "@fortawesome/free-solid-svg-icons";
import history from "../../history";
import {defaultErrorHandler} from "../../handlers/errorHandlers";

const App = () => {

    const [userDetails, setUserDetails] = useState(AppService.getInitialUserDetails());
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [isLoginRequestSending, setLoginRequestSending] = useState(false);

    const checkAuth = useCallback(() => {
        if (isLoginRequestSending) {
            return
        }

        setLoginRequestSending(true)

        const setUserRole = (role) => {
            if (userDetails.role !== role) {
                setUserDetails({...userDetails, role})
            }
        }

        if (AuthService.checkIsTokenExists()) {
            AuthService.checkAuthEndpoint()
                .then(response => {
                    setAuthenticated(true);
                    setUserRole(AuthService.getRole());
                })
                .catch(e => {
                    setAuthenticated(false);
                    setUserRole(RoleService.anonymous());
                    console.error('There has been a problem with your fetch operation: ', e.message);
                })
        } else {
            console.error('token not exists')
            setAuthenticated(false);
            setUserRole(RoleService.anonymous())
        }
        setLoginRequestSending(false)
    }, [isLoginRequestSending, userDetails, setAuthenticated])


    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    const onLoginFormInputChange = ({target}) => {
        const newUserDetails = {...userDetails}
        newUserDetails[target.name] = target.value
        setUserDetails(newUserDetails)
    }

    const onLoginFormSubmit = (event) => {
        event.preventDefault()
        AuthService.login(userDetails)
            .then(resp => resp.json()
                .then(json => {
                    Auth.writeToken(json);
                    history.push(PathService.home())
                    checkAuth()
                })
                .catch(console.error))
            .catch(defaultErrorHandler);

    }

    const onLogout = () => {
        AuthService.removeToken();
        setAuthenticated(false)
        setUserDetails(AppService.getInitialUserDetails())
    };

    const filterClients = (dataArr) => {
        return dataArr.sort(it => it.isActive ? -1 : 1)
    }

    return (
        <div className="app">
            <PathServiceContext.Provider value={PathService}>
                <UserDetailsContext.Provider value={{
                    username: userDetails.username,
                    role: userDetails.role
                }}>
                    <Router history={history}>

                        <ToolBar {...AppService.getToolBarProps(
                            isAuthenticated,
                            userDetails,
                            {
                                name: APP_NAME,
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
                                    onInputChange={onLoginFormInputChange}/>
                            </RouteWrapper>

                            <RouteWrapper exact path={PathService.home()}
                                          roles={PathService.roles().home()}>
                                <HomePage
                                    title="Главная"/>
                            </RouteWrapper>

                            <RouteWrapper exact path={PathService.newClient()}
                                          roles={PathService.roles().newClient()}>
                                <ClientDetails
                                    title="Новый клиент"
                                    getData={null}/>
                            </RouteWrapper>

                            <RouteWrapper exact path={PathService.clients()}
                                          roles={PathService.roles().clients()}>
                                <ClientsPage
                                    title="Клиенты"
                                    getData={ApiService.getClients}
                                    filterData={filterClients}/>
                            </RouteWrapper>

                            <RouteWrapper path={PathService.client()}
                                          roles={PathService.roles().client()}>
                                <ClientDetails getData={ApiService.getClient}/>
                            </RouteWrapper>

                            <RouteWrapper path={PathService.operations()}
                                          roles={PathService.roles().operations()}>
                                <DefaultPage
                                    title="Операции"
                                    icon={faBox}
                                    breadcrumbItems={[
                                        PathService.breadcrumbs().home(),
                                        PathService.breadcrumbs().operations()
                                    ]}/>
                            </RouteWrapper>

                            <RouteWrapper path={PathService.workers()}
                                          roles={PathService.roles().workers()}>
                                <DefaultPage
                                    title="Календарь"
                                    icon={faCalendarAlt}
                                    breadcrumbItems={[
                                        PathService.breadcrumbs().home(),
                                        PathService.breadcrumbs().calendar()
                                    ]}/>
                            </RouteWrapper>

                            <RouteWrapper path={PathService.settings()}
                                          roles={PathService.roles().settings()}>
                                <DefaultPage
                                    title="Настройки"
                                    icon={faCog}
                                    breadcrumbItems={[
                                        PathService.breadcrumbs().home(),
                                        PathService.breadcrumbs().settings()
                                    ]}/>
                            </RouteWrapper>

                        </Panel>

                    </Router>
                </UserDetailsContext.Provider>
            </PathServiceContext.Provider>
        </div>
    )
}

export default App