import RoleService from "../Role/RoleService";

const _PATH_DATA = {
    HOME: {
        path: "/",
        roles: [
            RoleService.admin(),
            RoleService.manager(),
            RoleService.anonymous(),
        ],
    },
    CLIENTS: {
        path: "/clients/",
        roles: [
            RoleService.admin(),
            RoleService.manager(),
            RoleService.anonymous(),
        ],
    },
    OPERATIONS: {
        path: "/operations/",
        roles: [
            RoleService.admin(),
            RoleService.manager(),
            RoleService.anonymous(),
        ],
    },
    SETTINGS: {
        path: "/settings",
        roles: [
            RoleService.admin(),
            RoleService.manager(),
        ],
    },
    LOGIN: {
        path: "/login",
        roles: [
            RoleService.admin(),
            RoleService.manager(),
            RoleService.anonymous(),
        ],
    },
}

const _isPathExists = path =>
    Object.values(_PATH_DATA).some(it => it.path === path)


export default {
    home: () => _PATH_DATA.HOME.path,
    clients: () => _PATH_DATA.CLIENTS.path,
    operations: () => _PATH_DATA.OPERATIONS.path,
    settings: () => _PATH_DATA.SETTINGS.path,
    login: () => _PATH_DATA.LOGIN.path,

    roles: () => {
        return {
            home: () => _PATH_DATA.HOME.roles,
            settings: () => _PATH_DATA.SETTINGS.roles,
            login: () => _PATH_DATA.LOGIN.roles,
        }
    },

    isPathExists: _isPathExists,

    isPathActive: (targetPath, activePath, rootPath = '/') => {
        const match = activePath.match(targetPath)
        return match && (activePath === rootPath ? true : match[0] !== rootPath)
    },
}