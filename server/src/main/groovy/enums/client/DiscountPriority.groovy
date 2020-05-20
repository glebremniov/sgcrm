package enums.client

import groovy.transform.CompileStatic

@CompileStatic
enum DiscountPriority {

    ZERO(0.0f),
    ONE_YEAR(0.5f),
    TWO_YEARS(1.0f),
    THREE_YEARS(1.5f),
    FIVE_OR_MORE(2.5f)

    DiscountPriority(float value) {
        this.value = value
    }

    private final float value

    float getValue() {
        return value
    }
}