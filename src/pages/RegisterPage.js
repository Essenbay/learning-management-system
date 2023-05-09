import React, {useState, useContext, useEffect} from "react";
import {User} from "../db/model/User"
import {Roles} from "../db/model/Roles";
import UserContext from "../util/userContext";
import 'bootstrap/dist/css/bootstrap.css';
import {Link, useNavigate} from "react-router-dom";
import {db} from "../db/db";

const RegisterPage = (props) => {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
    });

    const changeHandler = (event) => {
        let val = event.target.value;

        setUserInfo((prevState) => {
            return {
                ...prevState,
                [event.target.name]: val
            };
        });
    };

    const signUpAuth = (event) => {
        event.preventDefault();

        let username = userInfo.name.trim()
        let password = userInfo.password.trim()
        let email = userInfo.email.trim()
        let confirmPassword = userInfo.confirmPassword.trim()
        let role = userInfo.role

        if (password === confirmPassword) alert("Passwords doesn't match!")
        else {
            let newUser = new User(db.users.length, username, email, password, role)
            db.users.push(newUser)
            userContext.login(newUser)
            navigate("/", {replace: true});
        }
    };

    return (
        <div className="Loginpage">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title text-center">Signup Form</h3>
                                <form onSubmit={signUpAuth}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={userInfo.name}
                                                onChange={changeHandler}
                                                className="form-control"
                                                required
                                            />
                                            <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <div className="input-group">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={userInfo.email}
                                                onChange={changeHandler}
                                                className="form-control"
                                                required
                                            />
                                            <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-at"></i>
                    </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <div className="input-group">
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={userInfo.password}
                                                onChange={changeHandler}
                                                className="form-control"
                                                required
                                            />
                                            <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-lock"></i>
                    </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <div className="input-group">
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                value={userInfo.confirmPassword}
                                                onChange={changeHandler}
                                                className="form-control"
                                                required
                                            />
                                            <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-lock"></i>
                    </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary btn-block">
                                            Sign up
                                        </button>
                                    </div>
                                    <div className="text-center">
                                        Already have account? <Link to="/login">Login now</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};
export default RegisterPage;