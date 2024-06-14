import { NavLink } from "react-router-dom";

export function AdminSidebar() {
    const logout = () => {
        localStorage.removeItem('token');
        window.location.replace("http://localhost:5173/admin/login")
    }
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{height: "100vh" }}>
            <NavLink to="/admin/home" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">Admin</span>
            </NavLink>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink exact to="/admin/home" className="nav-link text-white" activeClassName="active">
                        Home
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink exact to="/admin/dashboard" className="nav-link text-white" activeClassName="active">
                        Employees
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink exact to="/admin/projects" className="nav-link text-white" activeClassName="active">
                        Projects
                    </NavLink>
                </li>
            </ul>
            <hr />
            <div onClick={logout} className="px-2" role="button">
                <i class="fa-solid fa-right-from-bracket me-2"></i>
                <span>Logout</span>
            </div>
        </div>
    );
}
