package meeting

import client.Client
import grails.compiler.GrailsCompileStatic
import security.User

@GrailsCompileStatic
class Meeting {

    String title
    Date date
    boolean isActive = true

    static belongsTo = [user: User, client: Client]

    static constraints = {
        title size: 1..150
    }
}
