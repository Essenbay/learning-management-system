import React, { useContext } from 'react';
import {Outlet, Navigate, useLocation} from 'react-router-dom'
import UserContext, {getUserFromStorage} from "./userContext";

const AuthRoute = ({ allowedRoles }) => {
    const userContext = useContext(UserContext);
    const location = useLocation();
    console.log("User: " + userContext.user)
    console.log("User from localstorage: " + getUserFromStorage())

    return (
        allowedRoles.includes(userContext.user.role)
            ? <Outlet />
            : userContext.user
                ? <Navigate to="/not-found" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}
export default AuthRoute