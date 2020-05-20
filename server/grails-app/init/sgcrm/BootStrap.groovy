package sgcrm

import grails.gorm.transactions.Transactional
import security.Role
import security.User
import security.UserRole

class BootStrap {

    private final FAIL_ON_ERROR = [failOnError: true]

    def init = { servletContext ->
        log.info "Loading database..."

        initSecurity()

        log.debug("Users count: ${User.count}")
        log.debug("Roles count: ${Role.count}")
    }

    @Transactional
    private initSecurity() {
        def adminUser = new User(username: 'admin@sgcrm.by', password: '46@Qh98z*W')
                .save(FAIL_ON_ERROR)
        def managerUser = new User(username: 'manager@sgcrm.by', password: 'hJ=DJk9mV8')
                .save(FAIL_ON_ERROR)

        def adminRole = new Role(authority: 'ROLE_ADMIN')
                .save(FAIL_ON_ERROR)
        def managerRole = new Role(authority: 'ROLE_MANAGER')
                .save(FAIL_ON_ERROR)

        UserRole.create(adminUser, adminRole, true)
        UserRole.create(managerUser, managerRole, true)
    }

    def destroy = {
    }
}
