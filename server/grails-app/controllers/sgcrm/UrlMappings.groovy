package sgcrm

class UrlMappings {

    static mappings = {
        delete "/$controller/$id(.$format)?"(action: "delete")
        get "/$controller(.$format)?"(action: "index")
        get "/$controller/$id(.$format)?"(action: "show")
        post "/$controller(.$format)?"(action: "save")
        put "/$controller/$id(.$format)?"(action: "update")
        patch "/$controller/$id(.$format)?"(action: "patch")

        delete "/api/$controller/$id(.$format)?"(action: "delete")
        get "/api/$controller(.$format)?"(action: "index")
        get "/api/$controller/$id(.$format)?"(action: "show")
        post "/api/$controller(.$format)?"(action: "save")
        put "/api/$controller/$id(.$format)?"(action: "update")
        patch "/api/$controller/$id(.$format)?"(action: "patch")

        "/api/checkAuth"(controller: 'application', action: 'checkAuth')

        "/"(controller: 'application', action: 'index')
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
