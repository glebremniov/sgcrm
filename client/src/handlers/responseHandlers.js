import Auth from '../services/Auth/AuthService';
import PathService from "../services/Path/PathService";

export const checkResponseStatus = response => {
    if (response.ok) {
        return response
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

export const loginResponseHandler = response => {
    response.json()
        .then(json => {
            Auth.writeToken(json);
            window.location.pathname = PathService.home()
        })
        .catch(console.error)
};