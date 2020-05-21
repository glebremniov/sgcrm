package client

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController

@Secured(['ROLE_ADMIN', 'ROLE_MANAGER'])
class ClientController extends RestfulController {
    static responseFormats = ['json', 'xml']
    ClientController() {
        super(Client)
    }
}
