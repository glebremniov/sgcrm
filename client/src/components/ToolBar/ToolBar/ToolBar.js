import React, {useContext} from "react";
import "./ToolBar.css"
import PropTypes from 'prop-types';
import ToolBarItem from "../ToolBarItem/ToolBarItem";
import ToolBarBrandItem from "../ToolBarBrandItem/ToolBarBrandItem";
import ToolbarAuthenticationItem from "../ToolBarLogOutItem/ToolbarAuthenticationItem";
import {useLocation} from "react-router-dom";
import StatusBar from "../../StatusBar/StatusBar";
import {UserDetailsContext} from "../../../contexts/UserDetailsContext";

const ToolBar = (props) => {

    const {
        brandItemProps,
        loginItemProps,
        logoutItemProps,
        statusBarProps,
        topItems,
        bottomItems,
        isPathActive,
    } = props;

    const activePath = useLocation().pathname;
    const userDetails = useContext(UserDetailsContext)

    const transformToolBarItems = (toolBarItems) =>
        toolBarItems.map(itemProps =>
            <ToolBarItem key={itemProps.id} {...itemProps} isActive={isPathActive(itemProps.href, activePath)}/>
        );

    const authenticationItemProps = userDetails.isAuthenticated ? logoutItemProps : loginItemProps

    return (
        <div className="vertical-menu shadow">

            <ToolBarBrandItem {...brandItemProps} />
            {
                transformToolBarItems(topItems)
            }
            <div className="bottom-container">
                {
                    transformToolBarItems(bottomItems)
                }

                <ToolbarAuthenticationItem {...authenticationItemProps}/>

                <StatusBar {...statusBarProps}/>
            </div>
        </div>
    );
};

ToolBar.propTypes = {
    brandItemProps: PropTypes.object,
    logOutItemProps: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    topItems: PropTypes.arrayOf(PropTypes.object),
    bottomItems: PropTypes.arrayOf(PropTypes.object),
    appInfo: PropTypes.object,
}

export default ToolBar;