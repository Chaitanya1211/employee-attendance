import { useEffect, useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import axios from "axios";
import "../../css/custom.css"
export function AdminDashboard() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [employees, setEmployees] = useState([]);
    function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        axios({
            url: `http://localhost:8080/admin/invite/${email}`,
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            }
        }).then((response) => {
            console.log(response.data)
            setIsLoading(false);
            setTimeout(() => {
                setToastMessage('Email Sent Successfully');
            }, 2000);
        }).catch((error) => {
            console.log("Error :", error)
        })
    }

    useEffect(() => {
        axios({
            url: "http://localhost:8080/admin/allEmployees",
            method: "GET",
            headers: {
                "token": token
            }
        }).then((response) => {
            console.log(response.data.all)
            if (response.status === 200) {
                setEmployees(response.data.all);
                console.log("Here")
            }
        }).catch((error) => {
            console.log("Error :", error)
            if (error.response.status === 404) {
                console.log("No employee found")
            } else if (error.response.status === 500) {
                console.log("Server error")
            }
        })
    }, [])
    return (
        <>
            <div className="d-flex">
                <div className="col-lg-2">
                    <AdminSidebar />
                </div>
                <div className="col-lg-10 p-5">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="card" id="emailSend">
                                <div className="card-body p-4">
                                    <h5 className="card-title mb-4">Invite Employee</h5>
                                    <form className="row row-cols-lg-auto g-3 align-items-center justify-content-end" onSubmit={handleSubmit}>
                                        <input type="text" className="form-control" id="autoSizingInput" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />

                                        <div className="col-12">
                                            <button type="submit" className="btn btn-primary w-md">Send Invite</button>
                                        </div>
                                    </form>

                                </div>
                                {isLoading && (
                                    <div id="loader-wrapper">
                                        <div className="spinner-border text-primary m-1" role="status"></div>
                                    </div>
                                )}

                                {toastMessage && (
                                    <div className="toast" role="alert" aria-live="assertive" aria-atomic="true" style={{ position: 'fixed', top: '10px', right: '10px' }}>
                                        <div className="toast-header">
                                            <strong className="mr-auto">Notification</strong>
                                            <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onClick={() => setToastMessage('')}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="toast-body">
                                            {toastMessage}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Show list of all employees */}

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row mb-2">
                                
                                        
                                        <div className="table-responsive">
                                            <table className="table align-middle table-nowrap table-hover dt-responsive nowrap w-100" id="userList-table">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th scope="col" style={{ "width": "40px" }}>Sr. No.</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Contact number</th>
                                                        <th scope="col">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {employees.map((employee, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="avatar-xs img-fluid rounded-circle me-3">
                                                                            <img src={employee.profileImg ?? ""} alt="Image " className="member-img img-fluid d-block rounded-circle" />
                                                                        </div>
                                                                        <div>
                                                                            <h5 className="text-truncate font-size-14 mb-1">
                                                                                <a href="javascript: void(0);" className="text-dark">{employee.firstName + " " + employee.lastName}</a>
                                                                            </h5>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>{employee.email}</td>
                                                                <td>{employee.contactNumber}</td>
                                                                <td>Active</td>
                                                            </tr>
                                                        );
                                                    })}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

} 