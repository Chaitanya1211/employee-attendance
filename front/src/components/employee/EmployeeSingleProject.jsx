import { useEffect, useState } from "react";
import { EmployeeSidebar } from "./EmployeeSidebar";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { Priority, Status } from "../../helper/priority";
import { toISTLocaleString } from "../../helper/dates";
import defaultImage from "../../assets/defaultImage.jpg";
export function SingleProject() {
    const { projectId } = useParams();
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [showBug, setShowBug] = useState(false);
    const [project, setProject] = useState([]);
    const [bugs, setBugs] = useState([]);
    useEffect(() => {
        axios({
            url: `http://localhost:8080/employee/project/${projectId}`,
            method: "GET",
            headers: {
                "token": token
            }
        }).then((response) => {
            setProject(response.data.details[0]);
            setBugs(response.data.bugs)
            console.log(response.data);
            console.log("Role :", response.data.role)
            if (response.data.role == "Tester") {
                setShowBug(true);
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
                                    <h4 class="mb-0 font-size-18">Project overview</h4>

                                    <div class="page-title-right">
                                        <ol class="breadcrumb m-0">
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Projects</a></li>
                                            <li class="breadcrumb-item active">Project</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div class="col-lg-7">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex">
                                            <div class="flex-shrink-0 me-4">
                                                <img src={project.projectImage ?? ""} alt="" class="avatar-sm" />
                                            </div>
                                            <div class="flex-grow-1 overflow-hidden">
                                                <h5 class="text-truncate font-size-15">{project.projectTitle}</h5>
                                                <p class="text-muted ">{project.projectDesc ?? ""}</p>
                                            </div>
                                        </div>

                                        <h5 class="font-size-15 mt-4">Bugs</h5>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div class="card mini-stats-wid mb-4">
                                                    <div class="card-body">
                                                        <div class="d-flex">
                                                            <div class="flex-grow-1">
                                                                <p class="text-muted fw-medium">Total</p>
                                                                <h4 class="mb-0">$16.2</h4>
                                                            </div>

                                                            <div class="flex-shrink-0 align-self-center">
                                                                <div class="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                                    <span class="avatar-title rounded-circle bg-primary">
                                                                        <i class="bx bx-purchase-tag-alt font-size-24"></i>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div class="card mini-stats-wid mb-4">
                                                    <div class="card-body">
                                                        <div class="d-flex">
                                                            <div class="flex-grow-1">
                                                                <p class="text-muted fw-medium">Closed</p>
                                                                <h4 class="mb-0">$16.2</h4>
                                                            </div>

                                                            <div class="flex-shrink-0 align-self-center">
                                                                <div class="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                                    <span class="avatar-title rounded-circle bg-primary">
                                                                        <i class="bx bx-purchase-tag-alt font-size-24"></i>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <h4 class="mb-4 font-size-18">Bugs Overview</h4>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div class="card mini-stats-wid">
                                            <div class="card-body">
                                                <div class="d-flex">
                                                    <div class="flex-grow-1">
                                                        <p class="text-muted fw-medium">Current Open</p>
                                                        <h4 class="mb-0">$16.2</h4>
                                                    </div>

                                                    <div class="flex-shrink-0 align-self-center">
                                                        <div class="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                            <span class="avatar-title rounded-circle bg-primary">
                                                                <i class="bx bx-purchase-tag-alt font-size-24"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div class="card mini-stats-wid">
                                            <div class="card-body">
                                                <div class="d-flex">
                                                    <div class="flex-grow-1">
                                                        <p class="text-muted fw-medium">Dev Done</p>
                                                        <h4 class="mb-0">$16.2</h4>
                                                    </div>
                                                    <div class="flex-shrink-0 align-self-center">
                                                        <div class="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                            <span class="avatar-title rounded-circle bg-primary">
                                                                <i class="bx bx-purchase-tag-alt font-size-24"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div class="card mini-stats-wid">
                                            <div class="card-body">
                                                <div class="d-flex">
                                                    <div class="flex-grow-1">
                                                        <p class="text-muted fw-medium">In-Progress</p>
                                                        <h4 class="mb-0">$16.2</h4>
                                                    </div>

                                                    <div class="flex-shrink-0 align-self-center">
                                                        <div class="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                            <span class="avatar-title rounded-circle bg-primary">
                                                                <i class="bx bx-purchase-tag-alt font-size-24"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div class="card mini-stats-wid">
                                            <div class="card-body">
                                                <div class="d-flex">
                                                    <div class="flex-grow-1">
                                                        <p class="text-muted fw-medium">Rechecking</p>
                                                        <h4 class="mb-0">$16.2</h4>
                                                    </div>

                                                    <div class="flex-shrink-0 align-self-center">
                                                        <div class="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                            <span class="avatar-title rounded-circle bg-primary">
                                                                <i class="bx bx-purchase-tag-alt font-size-24"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Bugs grid */}
                        <div class="row mb-3">
                            <div class="col-sm">
                                <div class="search-box me-2 d-inline-block">
                                    <div class="position-relative">
                                        <h4 class="mb-0 font-size-18">Bug List</h4>
                                    </div>
                                </div>
                            </div>

                            {/* If role==developer then not show button */}

                            {showBug &&
                                <div class="col-sm-auto">
                                    <div class="text-sm-end">
                                        <a href={`http://localhost:5173/raiseBug/${project._id}`} class="btn btn-success btn-rounded" id="addProject-btn"><i class="fa-solid fa-bug me-2"></i> Raise Bug</a>
                                    </div>
                                </div>
                            }
                        </div>

                        {/* Show all bugs */}
                        <div class="table-responsive">
                            <table class="table project-list-table align-middle table-nowrap dt-responsive nowrap w-100 table-borderless" id="projectList-table">
                                <thead class="table-light">
                                    <tr>
                                        <th scope="col" style={{ "width": "60px" }}>#</th>
                                        <th scope="col">Bug</th>
                                        <th scope="col">Raised On</th>
                                        <th scope="col">Latest Update</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Priority</th>
                                        <th scope="col">Team</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bugs.map((bug, index) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <div>{index + 1}</div>
                                                </td>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <div class="avatar-sm bg-light rounded p-2">
                                                            <img src={project.projectImage ?? "../../assets/sampleProject.jpg"} alt="Project Icon" class="img-fluid rounded-circle" />
                                                        </div>
                                                        <div class="ps-3">
                                                            <h5 class="text-truncate font-size-14">
                                                                <a href="javascript: void(0);" class="text-dark">{bug.title ?? ""}</a>
                                                            </h5>
                                                            <p class="text-muted mb-0 text-truncate" style={{ "width": "250px" }}>{bug.description ?? " "}</p>
                                                        </div>
                                                        {!bug.isViewed && <>
                                                        <span className="badge bg-danger" style={{"marginLeft":"auto", "alignSelf":"start"}}>New</span>
                                                        </>
                                                        }
                                                    </div>
                                                </td>
                                                <td>{toISTLocaleString(bug.raised_on)}</td>
                                                <td>{bug.latest_update ?? "N/A"}</td>
                                                <td>{Status(bug.current_status)}</td>
                                                <td>{Priority(bug.priority)}</td>
                                                <td>
                                                    <div class="avatar-group">
                                                        <a href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title={bug.assignedToName}>
                                                            <img src={bug.assignedToProfile ?? defaultImage} alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                        <a href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title={bug.raisedByName}>
                                                            <img src={bug.raisedByProfile ?? defaultImage} alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                </td>
                                                <td><ul class="list-unstyled hstack gap-1 mb-0">
                                                    <Link to={`/bug/${bug._id}`} >
                                                        <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
                                                            <span class="btn btn-sm btn-soft-primary"><i class="fa-solid fa-pen"></i></span>
                                                        </li>
                                                    </Link>
                                                </ul></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}