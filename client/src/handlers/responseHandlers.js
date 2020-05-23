import Auth from '../services/Auth/AuthService';
import PathService from "../services/Path/PathService";
import AppService from "../services/App/AppService";
import {HOME_PAGE} from "../config/config";

export const checkResponseStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response.json()
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

export const loginResponseHandler = response => {
    Auth.writeToken(response);
    window.location.pathname = AppService.isProdEnv() ? HOME_PAGE : PathService.home()
};