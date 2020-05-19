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

    }, [userDetails] )

    return (
        <div className="app">
            <UserDetailsContext.Provider value={{
                username: userDetails.username,
                userRole: userDetails.userRole
            }}>
                <BrowserRouter>

                    <ToolBar {...AppService.getToolBarProps(
                        isAuthenticated,
                        userDetails,
                        {
                            name: 'sgcrm'
                        },
                        () => {
                        },
                    )}/>

                    <Panel>

                        <RouteWrapper path={PathService.home()} exact
                            roles={PathService.roles().home()}>
                            <DefaultPage>
                                Главная
                            </DefaultPage>
                        </RouteWrapper>

                        <RouteWrapper path={PathService.clients()}
                            roles={PathService.roles().clients()}>
                            <DefaultPage>
                                Clients
                            </DefaultPage>
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

                    </Panel>

                </BrowserRouter>
            </UserDetailsContext.Provider>
        </div>
    )
}

export default App