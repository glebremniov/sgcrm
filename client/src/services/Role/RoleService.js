import {faUser, faUserSecret, faUserTie} from "@fortawesome/free-solid-svg-icons";

export default {
    anonymous: () => _ROLES.anonymous,
    admin: () => _ROLES.admin,
    manager: () => _ROLES.manager,

    isRoleValid: role =>
        Object.values(_ROLES).includes(role),

    getUserIcon(userRole) {
        switch (userRole) {
            case this.anonymous():
                return faUser
            case this.admin():
                return faUserSecret
            case this.manager():
                return faUserTie
            default: {
                return faUser
            }
        }
    }
}

const _ROLES = {
    anonymous: 'ROLE_ANONYMOUS',
    admin: 'ROLE_ADMIN',
    manager: 'ROLE_MANAGER',
}