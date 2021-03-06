import PathService from "../Path/PathService";
import ToolBarService from "../ToolBar/ToolBarService";
import RoleService from "../Role/RoleService";
import AuthService from "../Auth/AuthService";

const toolBarService = new ToolBarService();

export default {
    getToolBarProps(userDetails, appInfo, logoutHandler) {
        const topItems = toolBarService.getTopToolBarItems(userDetails.role)
        const bottomItems = toolBarService.getBottomToolBarItems(userDetails.role)
        const logoutItemProps = toolBarService.getLogoutItemProps(logoutHandler)
        const loginItemProps = toolBarService.getLoginItemProps(PathService.login())

        return {
            brandItemProps: {
                appName: appInfo.name.toLowerCase(),
            },
            logoutItemProps,
            loginItemProps,
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
            role: AuthService.getCurrentRole() || RoleService.anonymous(),
            isAuthenticated: false
        }
    },

    isProdEnv() {
        return !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    }
}