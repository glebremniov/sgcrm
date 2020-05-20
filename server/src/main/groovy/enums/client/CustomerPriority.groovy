package enums.client

import groovy.transform.CompileStatic

@CompileStatic
enum CustomerPriority {

    HIGHEST(5),
    NORMAL(3),
    BASIC(2),
    ZERO(0)

    CustomerPriority(int value) {
        this.value = value
    }

    private final int value

    int getValue() {
        return value
    }
}