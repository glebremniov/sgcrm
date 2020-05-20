package sgcrm

import grails.core.GrailsApplication
import grails.plugin.springsecurity.annotation.Secured
import grails.plugins.*
import org.springframework.http.HttpStatus

class ApplicationController implements PluginManagerAware {

    GrailsApplication grailsApplication
    GrailsPluginManager pluginManager

    def index() {
        [grailsApplication: grailsApplication, pluginManager: pluginManager]
    }

    @Secured(value = ['isAuthenticated()'])
    def checkAuth() {
        render(status: HttpStatus.OK)
    }
}
