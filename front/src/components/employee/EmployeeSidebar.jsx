import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export function EmployeeSidebar({name}) {
    const [token, setToken] = useState(localStorage.getItem('token') || "")
    const [role, setRole] = useState();
    useEffect(()=>{
       axios({
        url : "http://localhost:8080/employee/getRole",
        method : "GET",
        headers:{
            "token":token
        }
       }).then((resposne) =>{
        setRole(resposne.role);
       }).catch((error)=>{
        console.log("Error :", error)
       })
    },[])

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{height: "100vh" }}>
            <NavLink to="/admin/home" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">{name ? name:"Employee"}</span>
            </NavLink>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink exact to="/home" className="nav-link text-white" activeClassName="active">
                        Home
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink exact to="/profile" className="nav-link text-white" activeClassName="active">
                        Profile
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink exact to="/projects" className="nav-link text-white" activeClassName="active">
                        Projects
                    </NavLink>
                </li>
                
            </ul>
            <hr />
        </div>
    );
}
