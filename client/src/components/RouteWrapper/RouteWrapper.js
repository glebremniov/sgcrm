import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import {UserDetailsContext} from "../../contexts/UserDetailsContext";

const RouteWrapper = ({children, roles, loginPathname, ...rest}) => {

    const userDetails = useContext(UserDetailsContext)

    const isRoleAppropriate = (role, roles) => roles.includes(role);

    return (
        <Route
            {...rest}
            render={({location}) =>
                isRoleAppropriate(userDetails.role, roles) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );

};

export default RouteWrapper

RouteWrapper.defaultProps = {
    roles: [],
    loginPathname: '/login',
}