package address

import com.neovisionaries.i18n.CountryCode
import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
class Address {

    String country
    String countryISO2code
    String city
    String postcode
    String addressString

    static constraints = {
        country nullable: true, size: 0..50
        countryISO2code size: 2..2, inList: CountryCode.values()*.alpha2
        city size: 1..100
        postcode size: 5..10
        addressString size: 1..200
    }
}
