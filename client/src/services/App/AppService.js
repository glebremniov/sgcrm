import PathService from "../Path/PathService";
import ToolBarService from "../ToolBar/ToolBarService";
import RoleService from "../Role/RoleService";

const toolBarService = new ToolBarService();

export default {
    getToolBarProps(isAuthenticated, userDetails, appInfo, logoutHandler) {
        const topItems = toolBarService.getTopToolBarItems(userDetails.role)
        const bottomItems = toolBarService.getBottomToolBarItems(userDetails.role)
        const logOutItemProps = toolBarService.getToolBarLogOutItemProps(logoutHandler)

        return {
            brandItemProps: {
                appName: appInfo.name.toLowerCase(),
            },
            logOutItemProps,
            topItems,
            bottomItems,
            statusBarProps: {
                appInfo,
            },
            isPathActive: PathService.isPathActive
        }
    },

    getLoginFormProps(userDetails, loginHandler, inputChangeHandler) {
        return {
            userDetails: userDetails,
            error: null,
            onSubmit: loginHandler,
            inputChangeHandler: inputChangeHandler
        }
    },

    getInitialUserDetails() {
        return {
            username: '',
            password: '',
            role: RoleService.anonymous()
        }
    }
}