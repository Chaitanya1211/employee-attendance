import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export function EmployeeSidebar({name}) {
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
                
                {/* <li className="nav-item">
                    <NavLink to="/admin/orders" className="nav-link text-white" activeClassName="active">
                        Orders
                    </NavLink>
                </li> */}
                {/* <li className="nav-item">
                    <NavLink to="/admin/products" className="nav-link text-white" activeClassName="active">
                        Products
                    </NavLink>
                </li> */}
                {/* <li className="nav-item">
                    <NavLink to="/admin/customers" className="nav-link text-white" activeClassName="active">
                        Customers
                    </NavLink>
                </li> */}
            </ul>
            <hr />
        </div>
    );
}
