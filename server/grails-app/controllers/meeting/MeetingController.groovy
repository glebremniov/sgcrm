package meeting

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController
import security.User

@Secured(['ROLE_ADMIN', 'ROLE_MANAGER'])
class MeetingController extends RestfulController {
    static responseFormats = ['json', 'xml']

    MeetingController() {
        super(Meeting)
    }

    def indexByUser() {
        respond Meeting.findAllByUser(User.read(params.userId))
    }
}
