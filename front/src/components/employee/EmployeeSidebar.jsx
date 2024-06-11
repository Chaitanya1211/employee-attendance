import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export function EmployeeSidebar({ name }) {
    const [token, setToken] = useState(localStorage.getItem('token') || "");
    const [role, setRole] = useState();
    const location = useLocation(); // Hook to get the current location

    useEffect(() => {
        axios({
            url: "http://localhost:8080/employee/getRole",
            method: "GET",
            headers: {
                "token": token
            }
        }).then((response) => {
            setRole(response.data.role);
        }).catch((error) => {
            console.log("Error:", error);
        });
    }, [token]);

    const isProjectsActive = location.pathname.startsWith('/projects');

    const logout = () => {
        // clear token
        localStorage.removeItem('token');
        //redirst to login
        window.location.replace("http://localhost:5173/login")
    }

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ height: "100vh" }}>
            <NavLink to="/admin/home" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">{name ?? "Employee"}</span>
            </NavLink>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink exact to="/home" className="nav-link text-white" activeClassName="active">
                        <i className="fa-solid fa-house me-2"></i> Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/projects"
                        className={`nav-link text-white ${isProjectsActive ? 'active' : ''}`}
                        activeClassName="active"
                    >
                        <i className="fa-solid fa-code me-2"></i> Projects
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink exact to="/profile" className="nav-link text-white" activeClassName="active">
                        <i className="fa-solid fa-user me-2"></i> Profile
                    </NavLink>
                </li>
            </ul>
            <hr />
            <div onClick={logout} className="px-2">
                <i class="fa-solid fa-right-from-bracket me-2"></i>
                <span>Logout</span>
            </div>
        </div>
    );
}
