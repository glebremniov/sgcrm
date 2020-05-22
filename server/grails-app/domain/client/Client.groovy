package client

import enums.client.ClientType
import enums.client.CustomerPriority
import enums.client.DiscountPriority
import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
class Client {

    String payerAccountNumber
    String bankIdentificationCode

    String responsiblePerson

    ClientType clientType
    String fullName
    String shortName

    String phone
    String fax
    String email
    String postCode

    String country
    String state
    String street
    String buildingsNumber

    String webSite

    boolean isActive

    CustomerPriority customerPriority = CustomerPriority.BASIC
    DiscountPriority discountPriority = DiscountPriority.ZERO

    static constraints = {
        payerAccountNumber nullable: true, blank: false, size: 9..10, unique: true
        bankIdentificationCode nullable: true, blank: false, size: 9..10, unique: true
        webSite nullable: true, blank: false
    }
}
