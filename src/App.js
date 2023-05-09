import {Routes, Route, Router, Navigate, BrowserRouter} from "react-router-dom";
import './App.css';
import {Roles} from "./db/model/Roles";
import {UserContext, UserContextProvider} from "./util/userContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Admin from "./pages/Admin";
import Teacher from "./pages/Teacher";
import Student from "./pages/Student";
import NotFoundPage from "./db/model/NotFoundPage";
import {useContext} from "react";
import Layout from "./component/routes/Layout";
import AuthRoute from "./util/AuthRoute";

function App() {
    const {user} = useContext(UserContext);
    const getHomePath = () => {
        switch (user.role) {
            case 'admin':
                return <Navigate to="/admin"/>;
            case 'teacher':
                return <Navigate to="/teacher"/>;
            case 'student':
                return <Navigate to="/student"/>;
            default:
                return <Navigate to="/not-found"/>;
        }
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route exact path="/" element={user ? getHomePath(user) : <Navigate to="/login" />} />

                    {/*public routes*/}
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/not-found" element={<NotFoundPage/>}/>
                    <Route path="*" element={<Navigate to="/not-found"/>}/>

                    {/*Authorized routes*/}


                    {/*Admin routes*/}
                    <Route element={<AuthRoute allowedRoles={[Roles.ADMIN]}/>}>
                        <Route path="/admin" element={<Admin/>}/>
                    </Route>

                    {/*Teacher routes*/}
                    <Route element={<AuthRoute allowedRoles={[Roles.TEACHER]}/>}>
                        <Route path="/teacher" element={<Teacher/>}/>
                    </Route>

                    {/*Student routes*/}
                    <Route element={<AuthRoute allowedRoles={[Roles.STUDENT]}/>}>
                        <Route path="/student" element={<Student/>}/>
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}


export default App;
