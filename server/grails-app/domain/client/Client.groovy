package client

import address.Address
import enums.client.ClientType
import enums.client.CustomerPriority
import enums.client.DiscountPriority
import grails.compiler.GrailsCompileStatic
import payment.PaymentInfo

@GrailsCompileStatic
class Client {

    String fullName //Полное наименование
    String shortName //Короткое наименование

    PaymentInfo paymentInfo

    Address mailingAddress //Почтовый адрес
    Address legalAddress //Юридический адрес

    String phone
    String fax
    String email

    ClientType clientType
    String webSite

    boolean isActive

    CustomerPriority customerPriority = CustomerPriority.BASIC
    DiscountPriority discountPriority = DiscountPriority.ZERO

    static constraints = {
        shortName size: 1..50
        email email: true
        webSite nullable: true
    }
}
