package sgcrm

import client.Client
import enums.client.ClientType
import grails.gorm.transactions.Transactional
import security.Role
import security.User
import security.UserRole

class BootStrap {

    private final FAIL_ON_ERROR = [failOnError: true]

    def init = { servletContext ->
        log.info "Loading database..."

        initSecurity()
        initClients()

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

    @Transactional
    private initClients() {

        def client1 = new Client(
                responsiblePerson: 'Директор',
                clientType: ClientType.ENTITY,
                fullName: "Сообщество с ограниченной ответственностью Белабат",
                shortName: "СООО Белабат",
                phone: "+375 17 337 37 00",
                fax: "+375 17 337 37 00",
                email: "aliaksei.prakopchyk@abat.de",
                postCode: "220017",
                state: "Минск",
                street: "пр-т Притыцкого",
                buildingsNumber: "156"
        ).save(FAIL_ON_ERROR)
    }

    def destroy = {
    }
}
