import {createContext} from "react";
import RoleService from "../services/Role/RoleService";

export const UserDetailsContext = createContext({
    username: '',
    role: RoleService.anonymous(),
    isAuthenticated: false,
});