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

        new Client(
                responsiblePerson: 'Директор',
                clientType: ClientType.ENTITY,
                fullName: "Сообщество с ограниченной ответственностью «Белабат»",
                shortName: "СООО «Белабат»",
                payerAccountNumber: "190549007",
                phone: "+375 17 337 37 00",
                fax: "+375 17 337 37 00",
                email: "aliaksei.prakopchyk@abat.de",
                country: "Республика Беларусь",
                postCode: "220017",
                state: "Минск",
                street: "пр-т Притыцкого",
                buildingsNumber: "156"
        ).save(FAIL_ON_ERROR)

        new Client(
                responsiblePerson: 'Директор',
                clientType: ClientType.ENTITY,
                fullName: "Совместное белорусско-германское предприятие " +
                        "закрытое акционерное общество «МАЗ-МАН»",
                shortName: "СП ЗАО «МАЗ-МАН»",
                payerAccountNumber: "101439397",
                phone: "+375 17 337 37 00",
                fax: "+375 17 337 37 00",
                email: "aliaksei.prakopchyk@abat.de",
                country: "Республика Беларусь",
                postCode: "220017",
                state: "Минск",
                street: "ул. Центральная",
                buildingsNumber: "3а"
        ).save(FAIL_ON_ERROR)

        new Client(
                responsiblePerson: 'Тарасенко Илья Сергеевич',
                clientType: ClientType.ENTITY,
                fullName: "Публичное акционерное общество «Авиационная холдинговая компания «Сухой»",
                shortName: "ПАО «Компания «Сухой»",
                phone: "8 (495) 940-26-63",
                fax: "8 (495) 940-26-64",
                payerAccountNumber: "7740000090",
                email: "info@sukhoi.org",
                country: "Российская Федерация",
                postCode: "125284",
                state: "Москва",
                street: "ул. Поликарпова",
                buildingsNumber: "23 Б",
                webSite: "http://www.e-disclosure.ru/portal/company.aspx?id=13900"
        ).save(FAIL_ON_ERROR)

        new Client(
                responsiblePerson: "Осеевский Михаил Эдуардович",
                clientType: ClientType.ENTITY,
                fullName: "Публичное акционерное общество «Ростелеком»",
                shortName: "ПАО «Ростелеком»",
                payerAccountNumber: "7707049388",
                phone: "+7 (499) 999-82-83",
                fax: "+7 (499) 999-82-22",
                email: "rostelecom@rt.ru",
                country: "Российская Федерация",
                postCode: "191002",
                state: "Санкт-Петербург",
                street: "ул. Достоевского",
                buildingsNumber: "15",
                webSite: "https://www.company.rt.ru/"
        ).save(FAIL_ON_ERROR)

        new Client(
                responsiblePerson: "Director",
                clientType: ClientType.ENTITY,
                fullName: "Публичное акционерное общество «Аэрофлот»",
                shortName: "ПАО «Аэрофлот»",
                payerAccountNumber: "7712040126",
                phone: "8 (800) 444-55-55",
                fax: "8 (800) 444-55-55",
                email: "aeroflot@af.ru",
                country: "Российская Федерация",
                postCode: "119019",
                state: "Санкт-Петербург",
                street: "ул. Арбат",
                buildingsNumber: "1",
                webSite: "https://www.aeroflot.ru/"
        ).save(FAIL_ON_ERROR)
    }

    def destroy = {
    }
}
