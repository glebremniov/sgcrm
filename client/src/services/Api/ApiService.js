import {SERVER_URL} from "../../config/config";
import {headers} from "../../utils/headers";
import {checkResponseStatus} from "../../handlers/responseHandlers";

export default {

    testConnection(setConnected, showLoader, delay = 0) {
        console.log('Test connection..')

        const testConnectionInternal = () => {
            const onSuccess = () => {
                setConnected(true);
                console.log('Connected to server.')
            };

            const onError = error => {
                setConnected(false);
                console.error('Not connected to server. Error:', error)
            }

            fetch(buildUri('/api/testConnection'), {
                headers: headers()
            }).then(onSuccess)
                .catch(onError);
        }

        if (delay > 0) {
            showLoader();

            setTimeout(() => {
                testConnectionInternal()
            }, delay);

        } else {
            testConnectionInternal()
        }
    },

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
    init.headers = {...init.headers, ...headers()}
    const response = await fetch(uri, init)
    if (response.ok) {
        return response;
    }
    throw new Error('Network response was not ok.');
}

const _getResource = async (uri) => {
    try {
        const response = await fetchWrapper(uri)

        return response.json()
    } catch (e) {
        throw e
    }
};