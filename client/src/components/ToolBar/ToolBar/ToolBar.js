import React from "react";
import "./ToolBar.css"
import PropTypes from 'prop-types';
import ToolBarItem from "../ToolBarItem/ToolBarItem";
import ToolBarBrandItem from "../ToolBarBrandItem/ToolBarBrandItem";
import ToolBarLogOutItem from "../ToolBarLogOutItem/ToolBarLogOutItem";
import {useLocation} from "react-router-dom";
import StatusBar from "../../StatusBar/StatusBar";

const ToolBar = (props) => {

    const {
        brandItemProps,
        logOutItemProps,
        statusBarProps,
        topItems,
        bottomItems,
        isAuthenticated,
        isPathActive,
    } = props;

    const activePath = useLocation().pathname;

    const transformToolBarItems = (toolBarItems) =>
        toolBarItems.map(itemProps =>
            <ToolBarItem key={itemProps.id} {...itemProps} isActive={isPathActive(itemProps.href, activePath)}/>
        );

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
                {
                    isAuthenticated ? <ToolBarLogOutItem {...logOutItemProps}/> : null
                }
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