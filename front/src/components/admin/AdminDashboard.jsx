import { useEffect, useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import axios from "axios";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import "../../css/custom.css";
import { Link } from 'react-router-dom';
import inviteSchema from "../../helper/inviteValidator";
export function AdminDashboard() {
    const [toastMessage, setToastMessage] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [employees, setEmployees] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(inviteSchema)
    });
    const [disableBtn, setDisableBtn] = useState(false);
    const onFormSubmit = (data) => {
        console.log(data);
        setDisableBtn(true);
        
        axios({
            url: `http://localhost:8080/admin/invite`,
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "token": token
            },
            data: data
        }).then((response) => {
            console.log(response.data)
            setToastMessage(true)
            setDisableBtn(false);
        }).catch((error) => {
            setDisableBtn(false);
            console.log("Error :", error)
        })
    };


    const onErrors = errors => console.error(errors);

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
                <div className="col-lg-2 position-fixed">
                    <AdminSidebar />
                </div>
                <div className="col-lg-10" style={{ "marginLeft": "auto" }}>
                    <div className="col-lg-12 p-5">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title mb-4">Invite</h5>

                                        <form class="row gy-2 gx-3 align-items-center" onSubmit={handleSubmit(onFormSubmit, onErrors)}>
                                            <div class="col-lg-4">
                                            <label htmlFor="formrow-name-input" className="form-label">Email<span class="text-danger"> *</span></label>
                                                <input type="email" class="form-control" id="autoSizingInput" placeholder="Enter Email ID" {...register('email')} />
                                                <small className="text-danger">
                                                    {errors?.email && errors.email.message}
                                                </small>
                                                {toastMessage && 
                                                <small className="text-success">
                                                    Invite sent successfully
                                                </small>
                                                }
                                            </div>
                                            <div class="col-lg-3">
                                            <label htmlFor="formrow-name-input" className="form-label">Select Role<span class="text-danger"> *</span></label>
                                                <select class="form-select" id="autoSizingSelect" {...register('role')}>
                                                    <option value="">Select role</option>
                                                    <option value="developer">Developer</option>
                                                    <option value="tester">Tester / QA</option>
                                                    <option value="intern">Intern</option>
                                                </select>
                                                <small className="text-danger">
                                                    {errors?.role && errors.role.message}
                                                </small>
                                            </div>
                                            <div class="col-lg-2 align-self-end">
                                                <button type="submit" class="btn btn-primary w-md " disabled={disableBtn}>Invite</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Show list of all employees */}

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div class="row mb-2">
                                            <div class="col-sm-4">
                                                <div class="search-box me-2 mb-2 d-inline-block">
                                                    <div class="position-relative">
                                                        <input type="text" class="form-control" id="searchTableList" placeholder="Search..." />
                                                        <i class="bx bx-search-alt search-icon"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                                                                                    <Link to={`/admin/employee/${employee.email}`} className="text-dark">{employee.firstName + " " + employee.lastName}</Link>
                                                                                </h5>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>{employee.email}</td>
                                                                    <td>{employee.contactNumber}</td>
                                                                    <td><span class="badge bg-success">Active</span></td>
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
            </div>
        </>
    );
} 