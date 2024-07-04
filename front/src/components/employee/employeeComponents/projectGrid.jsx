import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import noProject from '../../../assets/no-project.png';
import { toISTLocaleString } from "../../../helper/dates";
import { ProjectCardSkeleton } from "../../../helper/Skeletons/ProjectCardSkeleton";

export function ProjectGrid() {
    const [token, getToken] = useState(localStorage.getItem('token') || '');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        console.log("loading:", loading);
        axios({
            url: "http://localhost:8080/employee/projects",
            method: "GET",
            headers: {
                "token": token
            }
        }).then((response) => {
            console.log("Response :", response);
            if (response.status === 200) {
                setProjects(response.data?.projects)
            }
            setLoading(false);
        }).catch((error) => {
            console.log("Error :", error)
        })
    }, [])

    return (
        <>
            {loading ? <>
                <div className="row">
                    {[1, 2, 3, 4].map((item, index) => (
                        <div className="col-xl-3 col-md-6" key={index}>
                            <ProjectCardSkeleton />
                        </div>
                    ))}
                </div>
            </> : <>
            <div class="row" id="jobgrid-list">

                {
                    projects.length != 0 ? <>
                        {
                            projects.map((project, index) => {
                                return (
                                    <>
                                        <div class="col-xl-3 col-md-6" key={index}>
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="favorite-icon">
                                                        <a href="javascript:void(0)"><i class="uil uil-heart-alt fs-18"></i></a>
                                                    </div>
                                                    <img src={project.projectImage ?? noProject} alt="Project Image" height="50" class="mb-3" />
                                                    <h5 class="fs-17 mb-2"><a href="javascript:void(0);" class="text-dark">{project.projectName ?? " "}</a></h5>
                                                    <ul class="list-inline mb-0">
                                                        <li class="list-inline-item">
                                                            <p class="text-muted fs-14 mb-1">Client Name</p>
                                                        </li>
                                                        <br />
                                                        <li class="list-inline-item">
                                                            <p class="text-muted fs-14 mb-0"><i class="far fa-calendar-alt text-primary me-1"></i> {toISTLocaleString(project.startDate)}</p>
                                                        </li>
                                                    </ul>
                                                    <div class="mt-4 hstack gap-2">
                                                        <Link to={`/projects/${project._id}`}>
                                                            <button class="btn btn-soft-primary">View More</button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </> : <> <h4>No projects found</h4> </>
                }
            </div>
            </>}
        </>
    );
}