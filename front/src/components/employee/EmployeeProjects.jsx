import { EmployeeSidebar } from "./EmployeeSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function EmployeeProjects() {

    const [token, getToken] = useState(localStorage.getItem('token') || '');
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        axios({
            url: "http://localhost:8080/employee/projects",
            method: "GET",
            headers: {
                "token": token
            }
        }).then((response) => {
            console.log("Response Project list :", response);
            if (response.status === 200) {
                setProjects(response.data?.projects)
            }
        }).catch((error) => {
            console.log("Error :", error)
        })
    }, [])

    return (
        <>
            <div className="d-flex">
                <div className="col-lg-2 position-fixed">
                    <EmployeeSidebar />
                </div>
                <div className="col-lg-10" style={{ "marginLeft": "auto" }}>
                    <div className="col-lg-12 p-5">
                        <div class="row">
                            <div class="col-12">
                                <div class="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 class="mb-0 font-size-18">Projects List</h4>

                                    <div class="page-title-right">
                                        <ol class="breadcrumb m-0">
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Projects</a></li>
                                            <li class="breadcrumb-item active">Projects List</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row mb-2">
                                            <div class="col-sm">
                                                <div class="search-box me-2 d-inline-block">
                                                    <div class="position-relative">
                                                        <input type="text" class="form-control" autocomplete="off" id="searchTableList" placeholder="Search..." />
                                                        <i class="bx bx-search-alt search-icon"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-auto">
                                                <div class="text-sm-end">
                                                    <a href="#" class="btn btn-success btn-rounded" id="addProject-btn"><i class="mdi mdi-plus me-1"></i> Add New Project</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="">
                                            <div class="table-responsive">
                                                <table class="table project-list-table align-middle table-nowrap dt-responsive nowrap w-100 table-borderless" id="projectList-table">
                                                    <thead class="table-light">
                                                        <tr>
                                                            <th scope="col" style={{ "width": "60px" }}>#</th>
                                                            <th scope="col">Projects</th>
                                                            <th scope="col">Open Bugs</th>
                                                            <th scope="col">In Progress</th>
                                                            <th scope="col">Rechecking</th>
                                                            <th scope="col">Closed</th>
                                                            <th scope="col">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {projects.map((project, index) => {
                                                            return (
                                                                <tr>
                                                                    <td>
                                                                        <div>{index + 1}</div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="d-flex align-items-center">
                                                                        <div class="avatar-sm bg-light rounded p-2">
                                                                            <img src={project.projectImage ?? "../../assets/sampleProject.jpg"} alt="Project Icon" class="img-fluid rounded-circle"/>
                                                                        </div>
                                                                        <div class="ps-3">
                                                                            <h5 class="text-truncate font-size-14">
                                                                                <a href="javascript: void(0);" class="text-dark">{project.projectName ?? ""}</a>
                                                                            </h5>
                                                                            <p class="text-muted mb-0">{project.projectDesc ?? " "}</p>
                                                                        </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>13</td>
                                                                    <td>10</td>
                                                                    <td>2</td>
                                                                    <td>1</td>
                                                                    <td>
                                                                        <Link to={`/project/${project._id}`}>
                                                                        <button class="btn btn-primary">View More</button>
                                                                        </Link>
                                                                        
                                                                    </td>
                                                                </tr>


                                                            )
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