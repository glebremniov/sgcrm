package address

import com.neovisionaries.i18n.CountryCode
import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
class Address {

    String country
    String countryISO2code
    String state
    String city
    String postcode
    String street
    String buildingsNumber
    String office

    static constraints = {
        country nullable: true, size: 0..50
        countryISO2code size: 2..2, inList: CountryCode.values()*.alpha2
        state size: 1..100
        city size: 1..100
        postcode size: 5..10
        street size: 1..100
        buildingsNumber size: 1..10
        office nullable: true, size: 1..10
    }
}
