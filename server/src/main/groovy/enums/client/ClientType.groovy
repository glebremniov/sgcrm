package enums.client

import groovy.transform.CompileStatic

@CompileStatic
enum ClientType {

    ENTITY('ENTITY'),
    INDIVIDUAL('INDIVIDUAL')

    ClientType(String value) {
        this.value = value
    }

    private final String value

    String getValue() {
        return value
    }
}