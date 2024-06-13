import { useEffect, useState } from "react";
import { TableLoader } from "./TableLoader";
import { Priority, Status } from "../../../helper/priority";
import { toISTLocaleString } from "../../../helper/dates";
import defaultImage from "../../../assets/defaultImage.jpg";
import { Link } from 'react-router-dom';
import axios from "axios";

export function BugList({ projectId, token, project }) {
    // pagination in bugs
    const [bugs, setBugs] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, settotalPages] = useState(0);
    const [paginateLoader, setPaginateLoader] = useState(false);

    // filter variables
    const [email, setEmail] = useState("");
    const [role, setRole] = useState('');
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const [filterState, setFilterState] = useState(false);

    // new
    const [employees, setEmployees] = useState([]);

    const handleChange = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        if (id === "type") {
            const selectedOption = event.target.options[event.target.selectedIndex];
            // const email = selectedOption.value;
            setEmail(selectedOption.value);
            // const role = selectedOption.getAttribute('data-role');
            setRole(selectedOption.getAttribute('data-role'));
        } else if (id === "priority") {
            setPriority(value)
        } else if (id === "curr_status") {
            setStatus(value);
        }
        setFilterState((prev) => !prev)
    }

    useEffect(() => {
        console.log("Email :", email);
        console.log("Role :", role);
        console.log("Priority :", priority);
        console.log("Status :", status);
        // call the api here
    }, [filterState]);

    // Bug list api
    useEffect(() => {
        setPaginateLoader(true);
        fetchBugs();
    }, [page, pageSize, filterState])

    function fetchBugs() {
        const filterData = {
            "employee": email,
            "priority": priority,
            "curr_status": status,
            "role": role
        }
        axios({
            url: `http://localhost:8080/admin/project/bugs?projectId=${projectId}&page=${page}&pageSize=${pageSize}`,
            method: "POST",
            data: filterData,
            headers: {
                "Content-Type": 'application/json',
                "token": token
            },
        }).then((response) => {
            console.log("Resposne of bugs :", response.data)
            if (response.status === 200) {
                setBugs(response.data?.bugs);
                settotalPages(response.data?.totalPages)
            }
            setPaginateLoader(false);
        }).catch((err) => {
            if (response.err && response.err.status === 404) {
                console.log("No bugs found");
            }
            setPaginateLoader(false);
        })
    }
    // all employees
    useEffect(() => {
        axios({
            url: "http://localhost:8080/admin/allEmployees",
            method: "GET",
            headers: {
                "token": token
            }
        }).then((response) => {
            if (response.status === 200) {
                console.log(response)
                setEmployees(response.data.all)
            }
        }).catch((error) => {
            setEmployees([]);
            if (error.response && error.response.status === 404) {
                console.log(error)
            } else if (error.response && error.response.status === 500) {
                console.log(error)
            }
        })
    }, [])

    return (
        <>
            <div class="row">
                <div class="col-sm">
                    <div class="position-relative">
                        <h4 class="mb-0 font-size-18">Bug List</h4>
                    </div>
                    <div className="row g-3 my-1">
                        <div className="col-lg-3">
                            <label htmlFor="type">Assigned To</label>
                            {/* <select class="form-select" value={type} id="type" onChange={handleChange}>
                                <option value="all" selected>All</option>
                                <option value="self">Assigned to me</option>
                            </select> */}
                            <select class="form-select" value={email} id="type" onChange={handleChange}>
                                <option value="">Select Employee</option>
                                {employees.map((employee) => (
                                    <option key={employee.email} value={employee.email} data-role={employee.role}>
                                        {employee.firstName + " " + employee.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-lg-3">
                            <label htmlFor="priority">Priority</label>
                            <select class="form-select" id="priority" value={priority} onChange={handleChange}>
                                <option value="">All</option>
                                <option value="HIGH">High</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="LOW">Low</option>
                            </select>
                        </div>
                        <div className="col-lg-3">
                            <label htmlFor="curr_status">Status</label>
                            <select class="form-select" id="curr_status" value={status} onChange={handleChange}>
                                <option value="">All</option>
                                <option value="OPEN">Open</option>
                                <option value="RECHECKING">Rechecking</option>
                                <option value="CLOSED">Closed</option>
                                <option value="INVALID">Invalid</option>
                                <option value="INPROGRESS">In-Progress</option>
                                <option value="DONE">Done</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

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
                        {paginateLoader ? <>
                            <tr>
                                <td colspan="8">
                                    <TableLoader />
                                </td>
                            </tr>
                        </> : <>
                            {bugs.length != 0 ? bugs.map((bug, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div>{((page - 1) * pageSize) + (index + 1)}</div>
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
                                                    <span className="badge bg-danger" style={{ "marginLeft": "auto", "alignSelf": "start" }}>New</span>
                                                </>
                                                }
                                            </div>
                                        </td>
                                        <td>{toISTLocaleString(bug.raised_on)}</td>
                                        <td>{bug.updated_by != null ? <>
                                            <div class="d-flex align-items-center">
                                                <div class="avatar-sm bg-light rounded p-2">
                                                    <img src={bug.updatedByProfile ?? "../../assets/sampleProject.jpg"} alt="Project Icon" class="img-fluid rounded-circle" />
                                                </div>
                                                <div class="ps-3">
                                                    <h5 class="text-truncate font-size-12 m-0">
                                                        <a href="javascript: v  oid(0);" class="text-dark">{bug.updatedByName + " " + bug.updatedByLastName}</a>
                                                    </h5>
                                                    <p class="text-muted mb-0">{Status(bug.current_status)}</p>
                                                    <small class="text-muted mb-0">{toISTLocaleString(bug.latest_update)}</small>
                                                </div>
                                            </div>
                                        </> : "N/A"}</td>
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
                                            <Link to={`http://localhost:5173/admin/bug/${bug._id}`} >
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
                                                    <span class="btn btn-sm btn-soft-primary"><i class="fa-solid fa-eye"></i></span>
                                                </li>
                                            </Link>
                                        </ul></td>
                                    </tr>
                                )
                            }) : <> <tr>
                                <td colspan="8" class="text-center"> <h4>No bugs found</h4> </td></tr> </>
                            }
                        </>}
                    </tbody>
                </table>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary mx-2" onClick={() => setPage(page - 1)} disabled={page === 1}>
                        Previous
                    </button>
                    <button className="btn btn-primary mx-2" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}