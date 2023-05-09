import React, { useEffect, useState } from "react";
import {db} from "../db/db";

export const getUserFromStorage = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
        const user = db.users.find((user) => {
            return parseInt(user.id) === parseInt(userId)
        });
        return user ? user : null;
    } else return null;
};

export const UserContext = React.createContext({
    user: getUserFromStorage(),
    setUser: () => {},
    logout: () => {},
});

export const UserContextProvider = (props) => {
    const [user, setUser] = useState(getUserFromStorage());

    const logoutHandler = () => {
        setUser(null);
        localStorage.removeItem("userId");
    };

    const login = (user) => {
        setUser(user);
        localStorage.setItem("userId", user.id);
    };

    return (
        <UserContext.Provider value={{ user, login, logout: logoutHandler }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;