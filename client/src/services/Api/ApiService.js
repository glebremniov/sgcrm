import {SERVER_URL} from "../../config/config";
import {headers} from "../../utils/headers";

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
    }
};

export const buildUri = (path, serverUrl = SERVER_URL) => {
    return `${serverUrl}${path}`
};

const _getResource = async (uri) => {
    try {
        const response = await fetch(uri, {
            headers: headers()
        });

        return response.json()
    } catch (e) {
        throw e
    }
};