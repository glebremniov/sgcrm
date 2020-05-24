package address

import client.Client
import com.neovisionaries.i18n.CountryCode
import enums.client.ClientType
import grails.gorm.transactions.Transactional
import payment.PaymentInfo
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
                fullName: "Сообщество с ограниченной ответственностью «Белабат»",
                shortName: "СООО «Белабат»",
                paymentInfo: new PaymentInfo(
                        bankName: "ЗАО «Альфа-Банк»",
                        bankIdentificationCode: "ALFABY2X",
                        payerAccountNumber: "190549007",
                        checkingAccountNumber: "BY59АКВВ36329000032145100000",
                ),
                mailingAddress: new Address(
                        countryISO2code: CountryCode.BY.alpha2,
                        state: "Минск",
                        city: "Минск",
                        postcode: "220012",
                        addressString: "ул. Притыцкого, д. 156, офис 29",
                ),
                legalAddress: new Address(
                        countryISO2code: CountryCode.BY.alpha2,
                        state: "Минск",
                        city: "Минск",
                        postcode: "220012",
                        addressString: "ул. Притыцкого, д. 156, офис 29",
                ),
                phone: "+375172904878",
                fax: "+375172904878",
                email: "belabat@abatgroup.de",
                clientType: ClientType.ENTITY,
                webSite: "https://www.abat.de/en/belabat",
                isActive: true
        ).save(FAIL_ON_ERROR)

        new Client(
                fullName: "Открытое акционерное общество «Минский автомобильный завод»",
                shortName: "ОАО «МАЗ»",
                paymentInfo: new PaymentInfo(
                        bankName: "ОАО АСБ «Беларусбанк»",
                        bankIdentificationCode: "815",
                        payerAccountNumber: "101439397",
                        checkingAccountNumber: "3012017660020",
                        nceoNumber: "05808729"
                ),
                mailingAddress: new Address(
                        countryISO2code: CountryCode.BY.alpha2,
                        state: "Минск",
                        city: "Минск",
                        postcode: "220021",
                        addressString: "ул. Социалистическая, д. 2",
                ),
                legalAddress: new Address(
                        countryISO2code: CountryCode.BY.alpha2,
                        state: "Минск",
                        city: "Минск",
                        postcode: "220021",
                        addressString: "ул. Социалистическая, д. 2",
                ),
                phone: "+375172172077",
                fax: "+375172172077",
                email: "web@maz.by",
                clientType: ClientType.ENTITY,
                webSite: "http://maz.by/",
                isActive: false
        ).save(FAIL_ON_ERROR)

        new Client(
                fullName: "Открытое акционерное общество «МАПИД»",
                shortName: "ОАО «МАПИД»",
                paymentInfo: new PaymentInfo(
                        bankName: "ОАО «Белинвестбанк»",
                        bankIdentificationCode: "BLBBBY2X",
                        payerAccountNumber: "101439397",
                        checkingAccountNumber: "BY87BLBB30120100008115001001",
                        nceoNumber: "05808729"
                ),
                mailingAddress: new Address(
                        countryISO2code: CountryCode.BY.alpha2,
                        state: "Минск",
                        city: "Минск",
                        postcode: "220036",
                        addressString: "ул. Р. Люксембург, д. 205",
                ),
                legalAddress: new Address(
                        countryISO2code: CountryCode.BY.alpha2,
                        state: "Минск",
                        city: "Минск",
                        postcode: "220036",
                        addressString: "ул. Р. Люксембург, д. 205",
                ),
                phone: "+375172098700",
                fax: "+375172098700",
                email: "mail@mapid.by",
                clientType: ClientType.ENTITY,
                webSite: "http://mapid.by/",
                isActive: true
        ).save(FAIL_ON_ERROR)

    }

    def destroy = {
    }
}
