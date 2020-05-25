import {SERVER_URL} from "../../config/config";
import {headers} from "../../utils/headers";
import {checkResponseStatus} from "../../handlers/responseHandlers";

export default {
    pathNames() {
        return {
            login: '/api/login',
            refreshToken: '/oauth/access_token'
        }
    },

    getClients() {
        return _getResource(buildUri('/api/client'))
    },

    getClient(id) {
        return _getResource(buildUri(`/api/client/${id}`))
    },

    saveClient(client) {
        return fetchWrapper(buildUri('/api/client/'), {
            method: 'post',
            body: JSON.stringify(client)
        }).then(checkResponseStatus)
    },

    updateClient(id, client) {
        return fetchWrapper(buildUri(`/api/client/${id}`), {
            method: 'put',
            body: JSON.stringify(client)
        }).then(checkResponseStatus)
    }
};

export const buildUri = (path, serverUrl = SERVER_URL) => {
    return `${serverUrl}${path}`
};

export const fetchWrapper = async function (uri, init = {}) {
    const initCopy = {...init};
    initCopy.headers = {...initCopy.headers, ...headers()}
    return fetch(uri, initCopy).then(checkResponseStatus)
}

const _getResource = async (uri) => {
    try {
        const response = await fetchWrapper(uri)

        return response.json()
    } catch (e) {
        throw e
    }
};