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
        ],
    },
    CLIENT: {
        path: "/clients/:id",
        roles: [
            RoleService.admin(),
            RoleService.manager(),
        ],
    },
    OPERATIONS: {
        path: "/operations/",
        roles: [
            RoleService.admin(),
            RoleService.manager(),
        ],
    },
    WORKERS: {
        path: "/workers/",
        roles: [
            RoleService.admin(),
            RoleService.manager(),
        ],
    },
    CALENDAR: {
        path: "/calendar/",
        roles: [
            RoleService.admin(),
            RoleService.manager()
        ]
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

    breadCrumbs: () => {
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