import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { AdminSidebar } from './AdminSidebar';
import { BackBtn } from '../../helper/backButton';
import { BugCounts } from '../admin/adminComponents/bugCount';
import { BugList } from './adminComponents/BugList';
import noProject from '../../assets/no-project.png';
export function AdminSingleProject() {
    const { projectId } = useParams();
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [project, setProject] = useState([]);
    const [total, setTotal] = useState(0);
    const [closed, setClosed] = useState(0);
    // Project details
    useEffect(() => {
        axios({
            url: `http://localhost:8080/admin/project/${projectId}`,
            method: "GET",
            headers: {
                "token": token
            }
        }).then((response) => {
            setProject(response.data.details[0]);
            setTotal(response.data?.total);
            setClosed(response.data?.closed);
            console.log(response.data);
        }).catch((error) => {
            console.log("Error :", error)
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
                                                <img src={project.projectImage ?? noProject} alt="" class="avatar-sm img-fluid" />
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
                                                                <h4 class="mb-0">{total ?? ""}</h4>
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
                                                                <h4 class="mb-0">{closed ?? ""}</h4>
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
                                <BugCounts projectId={projectId} token={token} />
                            </div>
                        </div>
                        {/* Show all bugs */}
                        <BugList projectId={projectId} token={token} project={project}  />
                    </div>
                </div>
            </div>
        </>
    );
}