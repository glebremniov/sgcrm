package client

import enums.client.ClientType
import enums.client.CustomerPriority
import enums.client.DiscountPriority
import grails.compiler.GrailsCompileStatic
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource

@Resource(uri = '/api/client')
@GrailsCompileStatic
@Secured(['ROLE_ADMIN', 'ROLE_MANAGER'])
class Client {

    String responsiblePerson

    ClientType clientType
    String fullName
    String shortName

    String phone
    String fax
    String email
    String postCode

    String iso3countryCode = 'BEL'
    String state
    String street
    String buildingsNumber

    boolean isActive

    CustomerPriority customerPriority = CustomerPriority.BASIC
    DiscountPriority discountPriority = DiscountPriority.ZERO

    static constraints = {

    }
}
