import PathService from "../services/Path/PathService";
import history from '../history';

export const checkResponseStatus = response => {
    if (response.ok) {
        return response
    } else {
        if (isNotAuthorizedError(response)) {
            history.push(PathService.login())
        }
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};
export const isNotAuthorizedError = response => response.status === 401