import React, {useState} from "react";
import "./App.css";
import AppService from "../../services/App/AppService";
import ToolBar from "../ToolBar/ToolBar/ToolBar";
import {BrowserRouter} from "react-router-dom";
import {UserDetailsContext} from "../../contexts/UserDetailsContext"
import DefaultPage from "../DefaultPage/DefaultPage";
import Panel from "../Panel/Panel";

const App = () => {

    const [userDetails, setUserDetails] = useState(AppService.getInitialUserDetails())

    return (
        <div className="app">
            <BrowserRouter>
                <UserDetailsContext.Provider value={{
                    username: userDetails.username,
                    userRole: userDetails.userRole
                }}>
                    <ToolBar {...AppService.getToolBarProps(
                        true,
                        userDetails,
                        {
                            name: 'sgcrm'
                        },
                        () => {
                        },
                        () => {
                        }
                    )}/>

                    <Panel>
                        <DefaultPage/>
                    </Panel>

                </UserDetailsContext.Provider>
            </BrowserRouter>
        </div>
    )
}

export default App