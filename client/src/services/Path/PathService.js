import RoleService from "../Role/RoleService";
import {APP_NAME, HOME_PAGE} from "../../config/config";

const _getHomePath = () => {
    const parts = HOME_PAGE.split('/');
    return parts && parts.length > 0 ?
        parts[parts.length - 1] : APP_NAME
}

const HOME_PATH = `/${_getHomePath()}`;

const _PATH_DATA = {
    HOME: {
        path: HOME_PATH,
        roles: [
            RoleService.admin(),
            RoleService.manager(),
            RoleService.anonymous(),
        ],
    },
    CLIENTS: {
        path: HOME_PATH + "/clients/",
        roles: [
            RoleService.admin(),
            RoleService.manager(),
        ],
    },
    CLIENT: {
        path: HOME_PATH + "/clients/:id",
        roles: [
            RoleService.admin(),
            RoleService.manager(),
        ],
    },
    OPERATIONS: {
        path: HOME_PATH + "/operations/",
        roles: [
            RoleService.admin(),
            RoleService.manager(),
        ],
    },
    WORKERS: {
        path: HOME_PATH + "/workers/",
        roles: [
            RoleService.admin(),
            RoleService.manager(),
        ],
    },
    CALENDAR: {
        path: HOME_PATH + "/calendar/",
        roles: [
            RoleService.admin(),
            RoleService.manager()
        ]
    },
    SETTINGS: {
        path: HOME_PATH + "/settings",
        roles: [
            RoleService.admin(),
            RoleService.manager(),
        ],
    },
    LOGIN: {
        path: HOME_PATH + "/login",
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
    client: () => _PATH_DATA.CLIENT.path,
    operations: () => _PATH_DATA.OPERATIONS.path,
    workers: () => _PATH_DATA.WORKERS.path,
    calendar: () => _PATH_DATA.WORKERS.path,
    settings: () => _PATH_DATA.SETTINGS.path,
    login: () => _PATH_DATA.LOGIN.path,

    roles: () => {
        return {
            home: () => _PATH_DATA.HOME.roles,
            clients: () => _PATH_DATA.CLIENTS.roles,
            client: () => _PATH_DATA.CLIENT.roles,
            operations: () => _PATH_DATA.OPERATIONS.roles,
            workers: () => _PATH_DATA.WORKERS.roles,
            calendar: () => _PATH_DATA.WORKERS.roles,
            settings: () => _PATH_DATA.SETTINGS.roles,
            login: () => _PATH_DATA.LOGIN.roles,
        }
    },

    breadcrumbs: () => {
        return {
            home: () => {
                return {
                    label: 'Главная',
                    href: _PATH_DATA.HOME.path,
                }
            },
            clients: () => {
                return {
                    label: 'Клиенты',
                    href: _PATH_DATA.CLIENTS.path,
                }
            },
            client: (id, title) => {
                return {
                    label: title,
                    href: _PATH_DATA.HOME.path + id,
                }
            },
            operations: () => {
                return {
                    label: 'Операции',
                    href: _PATH_DATA.OPERATIONS.path,
                }
            },
            workers: () => {
                return {
                    label: 'Сотрудники',
                    href: _PATH_DATA.WORKERS.path,
                }
            },
            calendar: () => {
                return {
                    label: 'Календарь',
                    href: _PATH_DATA.CALENDAR.path,
                }
            },
            settings: () => {
                return {
                    label: 'Настройки',
                    href: _PATH_DATA.SETTINGS.path,
                }
            }
        }
    },

    isPathExists: _isPathExists,

    isPathActive: (targetPath, activePath, rootPath = '/') => {
        const match = activePath.match(targetPath)
        return match && (activePath === rootPath ? true : match[0] !== rootPath)
    },
}