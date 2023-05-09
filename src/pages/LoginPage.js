import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Roles} from "../db/model/Roles";
import UserContext from "../util/userContext";
import {db} from "../db/db";
import 'bootstrap/dist/css/bootstrap.css';

const LoginPage = () => {
    const [userCred, setUserCred] = useState({
        email: "",
        password: ""
    });
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const changeHandler = (event) => {
        let val = event.target.value;
        setUserCred((prevState) => {
            return {
                ...prevState,
                [event.target.name]: val
            };
        });
    };

    const submitHandler = (event) => {
        event.preventDefault()
        const email = userCred.email.trim();
        const password = userCred.password.trim();

        const user = db.users.find((u) => u.email === email && u.password === password);
        if (user) {
            userContext.login(user)
            if (user.role === Roles.ADMIN) {
                navigate("/admin");
            } else if (user.role === Roles.TEACHER) {
                navigate("/teacher");
            } else if (user.role === Roles.STUDENT) {
                navigate("/student");
            }
        } else {
            alert("Invalid email or password")
        }
        setUserCred({email: "", password: ""});
    }

    return (
        <div className="container-fluid h-100">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-header text-center">
                            <h3 className="mb-0">Login Form</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitHandler}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={userCred.email}
                                        onChange={changeHandler}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={userCred.password}
                                        onChange={changeHandler}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
                                <div className="text-center mt-3">
                                    Or <a href="/register">Sign up now</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};
export default LoginPage;