import {checkResponseStatus} from "../../handlers/responseHandlers";
import * as qs from "qs";
import ApiService, {buildUri, fetchWrapper} from "../Api/ApiService";

const {login: URI_LOGIN, refreshToken: URI_REFRESH_TOKEN} = ApiService.pathNames()

export default {

    getCurrentRole() {
        if (localStorage.auth) {
            const auth = JSON.parse(localStorage.auth);
            
            if (auth && auth.roles) {
                const {roles} = auth;
                if (Array.isArray(roles) && roles.length > 0) {
                    return roles[0];
                }
            }
        }

        return null;
    },

    login(userDetails) {
        return fetch(buildUri(URI_LOGIN), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        }).then(checkResponseStatus)
    },

    writeToken(auth) {
        localStorage.auth = JSON.stringify(auth);
    },

    removeToken() {
        delete localStorage.auth;
    },

    checkIsTokenExists() {
        return !!localStorage.auth
    },

    refreshToken() {
        return fetch(buildUri(URI_REFRESH_TOKEN), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: qs.stringify({
                grant_type: 'refresh_token',
                refresh_token: JSON.parse(localStorage.auth).refresh_token
            })
        }).then(checkResponseStatus)
            .then(this.writeToken)
            .catch(() => {
                throw new Error("Unable to refresh!")
            })
    },

    checkAuthEndpoint() {
        return fetchWrapper(buildUri('/api/checkAuth'))
    }
};