import { useEffect, useState } from "react";
import { EmployeeSidebar } from "./EmployeeSidebar";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { BugCounts } from "./employeeComponents/bugCount";
import { BackBtn } from "../../helper/backButton";
import { BugList } from "./employeeComponents/BugList";
import noProject from '../../assets/no-project.png';
import open from '../../assets/svg/open-bug.svg';
export function SingleProject() {
    const { projectId } = useParams();
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [showBug, setShowBug] = useState(false);
    const [project, setProject] = useState([]);
    const [countData, setCountData] = useState([]);
    const [role, setRole] = useState("");
    useEffect(() => {
        axios({
            url: `http://localhost:8080/employee/project/${projectId}`,
            method: "GET",
            headers: {
                "token": token
            }
        }).then((response) => {
            setProject(response.data.details[0]);
            console.log(response.data);
            setRole(response.data.role);
            console.log("Role :",role)
            if (response.data.role == "Tester") {
                setShowBug(true);
            }
        }).catch((error) => {
            console.log("Error :", error)
        })
    }, [])

    // bug count api
    useEffect(() => {
        axios({
            url: `http://localhost:8080/employee/project/getBugCount/${projectId}`,
            method: "GET",
            headers: {
                "token": token
            }
        }).then((response) => {
            if (response.status === 200) {
                setCountData(response.data.count)
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
                                    <div className="d-flex align-items-center">
                                        <BackBtn />
                                        <h4 class="mb-0 font-size-18">Project overview</h4>
                                    </div>

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
                                                <img src={project.projectImage ?? noProject} alt="" class="avatar-sm" />
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
                                                                <h4 class="mb-0">{countData.total ?? ""}</h4>
                                                            </div>

                                                            <div class="flex-shrink-0 align-self-center">
                                                                <div class="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                                    <span class="avatar-title rounded-circle bg-primary">
                                                                    <i class="fa-solid fa-bug font-size-24"></i>
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
                                                                <h4 class="mb-0">{countData.closed ?? ""}</h4>
                                                            </div>

                                                            <div class="flex-shrink-0 align-self-center">
                                                                <div class="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                                    <span class="avatar-title rounded-circle bg-primary">
                                                                    <i class="fa-solid fa-bug-slash font-size-24"></i>
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
                                <BugCounts projectId={projectId} token={token} ></BugCounts>
                            </div>
                        </div>
                        {/* Show all bugs */}
                        <BugList showBug={showBug} projectId={projectId} token={token} project={project} role={role}/>
                    </div>
                </div>
            </div>
        </>
    );
}