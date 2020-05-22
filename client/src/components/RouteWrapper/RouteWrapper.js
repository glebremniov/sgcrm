import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import {UserDetailsContext} from "../../contexts/UserDetailsContext";
import {PathServiceContext} from "../../contexts/PathServiceContext";

const RouteWrapper = ({children, roles, ...rest}) => {

    const userDetails = useContext(UserDetailsContext);
    const PathService = useContext(PathServiceContext);

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
                            pathname: PathService.login(),
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
}