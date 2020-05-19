import {faBox, faCog, faHome, faSignOutAlt, faUserTie, faWallet} from "@fortawesome/free-solid-svg-icons";
import PathService from "../Path/PathService";
import RoleService from "../Role/RoleService";

export default class ToolBarService {
    getToolBarLogOutItemProps = (onLogOut, label = 'Выйти') => {
        return {
            id: 'logout',
            label,
            faIcon: faSignOutAlt,
            onClick: onLogOut,
            className: 'text-danger',
        }
    };

    getTopToolBarItems = (role) => {
        const ids = {
            HOME: 'home',
            CLIENTS: 'clients',
            OPERATIONS: 'operations',
            WORKERS: 'workers',
        }

        const items = [
            {
                id: ids.HOME,
                label: 'Главная',
                href: PathService.home(),
                faIcon: faHome,
            },
            {
                id: ids.CLIENTS,
                label: 'Клиенты',
                href: PathService.clients(),
                faIcon: faWallet,
            },
            {
                id: ids.OPERATIONS,
                label: 'Операции',
                href: PathService.operations(),
                faIcon: faBox,
            },
            {
                id: ids.WORKERS,
                label: 'Сотрудники',
                href: PathService.workers(),
                faIcon: faUserTie,
            },
        ];

        switch (role) {
            case RoleService.admin():
                return this.filterItemsByIds(items,
                    ids.HOME,
                    ids.CLIENTS,
                    ids.OPERATIONS,
                    ids.WORKERS)
            case RoleService.manager():
                return this.filterItemsByIds(items,
                    ids.HOME,
                    ids.CLIENTS,
                    ids.OPERATIONS)
            case RoleService.anonymous():
                return this.filterItemsByIds(items,
                    ids.HOME)
            default:
                return []
        }
    }

    getBottomToolBarItems = (role) => {
        return role ? [
            {
                id: 'settings',
                label: 'Настройки',
                href: PathService.settings(),
                faIcon: faCog,
                forceShowIcon: true,
            },
        ] : []
    }

    filterItemsByIds = (items = [], ...ids) => {
        return items.filter(it => ids.includes(it.id))
    }
}