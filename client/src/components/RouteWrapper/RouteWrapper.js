import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import {UserDetailsContext} from "../../contexts/UserDetailsContext";

const RouteWrapper = ({children, roles, loginPathname, ...rest}) => {

    const {role} = useContext(UserDetailsContext)

    const isRoleAppropriate = (role, roles) => roles.includes(role);

    return isRoleAppropriate(role, roles) ?
        <Route {...rest} render={() => children}/> : <Redirect to={loginPathname}/>

};

export default RouteWrapper

RouteWrapper.defaultProps = {
    roles: [],
    loginPathname: '/login',
}