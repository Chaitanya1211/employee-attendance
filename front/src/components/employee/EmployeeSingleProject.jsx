import { useEffect, useState } from "react";
import { EmployeeSidebar } from "./EmployeeSidebar";
import { useParams } from 'react-router-dom';
import axios from "axios";

export function SingleProject() {
    const {projectId} = useParams();
    const [token,setToken] = useState(localStorage.getItem('token') || '');
    const [role, setRole] = useState();
    const [showBug, setShowBug] = useState(false);
    const [project,setProject] = useState([]);
    useEffect(()=>{
        axios({
            url : `http://localhost:8080/employee/project/${projectId}`,
            method:"GET",
            headers:{
                "token":token
            }
        }).then((response)=>{
            setProject(response.data.details[0]);
            console.log("Role :", response.data.role)
            if(response.data.role=="Tester"){
                setShowBug(true);
            }
        }).catch((error) =>{
            console.log("Error :", error)
        })
    },[])
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
                                                <p class="text-muted">{project.projectDesc ?? ""}</p>
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
                                    <a href={`http://localhost:5173/raiseBug/${project._id}`} class="btn btn-success btn-rounded" id="addProject-btn"><i class="mdi mdi-plus me-1"></i> Raise Bug</a>
                                </div>
                            </div>
                            }
                        </div>

                        <div className="row">
                            <div class="col-xl-4 col-sm-6">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex">
                                            <div class="flex-shrink-0 me-4">
                                                <div class="avatar-md">
                                                    <span class="avatar-title rounded-circle bg-light text-danger font-size-16">
                                                        <img src="assets/images/companies/img-1.png" alt="" height="30" />
                                                    </span>
                                                </div>
                                            </div>


                                            <div class="flex-grow-1 overflow-hidden">
                                                <h5 class="text-truncate font-size-15"><a href="javascript: void(0);" class="text-dark">New admin Design</a></h5>
                                                <p class="text-muted mb-4">It will be as simple as Occidental</p>
                                                <div class="avatar-group">
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-4.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-5.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <div class="avatar-xs">
                                                                <span class="avatar-title rounded-circle bg-success text-white font-size-16">
                                                                    A
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-2.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="px-4 py-3 border-top">
                                        <ul class="list-inline mb-0">
                                            <li class="list-inline-item me-3">
                                                <span class="badge bg-success">Completed</span>
                                            </li>
                                            <li class="list-inline-item me-3">
                                                <i class="bx bx-calendar me-1"></i> 15 Oct, 19
                                            </li>
                                            <li class="list-inline-item me-3">
                                                <i class="bx bx-comment-dots me-1"></i> 214
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-sm-6">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex">
                                            <div class="flex-shrink-0 me-4">
                                                <div class="avatar-md">
                                                    <span class="avatar-title rounded-circle bg-light text-danger font-size-16">
                                                        <img src="assets/images/companies/img-1.png" alt="" height="30" />
                                                    </span>
                                                </div>
                                            </div>


                                            <div class="flex-grow-1 overflow-hidden">
                                                <h5 class="text-truncate font-size-15"><a href="javascript: void(0);" class="text-dark">New admin Design</a></h5>
                                                <p class="text-muted mb-4">It will be as simple as Occidental</p>
                                                <div class="avatar-group">
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-4.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-5.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <div class="avatar-xs">
                                                                <span class="avatar-title rounded-circle bg-success text-white font-size-16">
                                                                    A
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-2.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="px-4 py-3 border-top">
                                        <ul class="list-inline mb-0">
                                            <li class="list-inline-item me-3">
                                                <span class="badge bg-success">Completed</span>
                                            </li>
                                            <li class="list-inline-item me-3">
                                                <i class="bx bx-calendar me-1"></i> 15 Oct, 19
                                            </li>
                                            <li class="list-inline-item me-3">
                                                <i class="bx bx-comment-dots me-1"></i> 214
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-sm-6">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex">
                                            <div class="flex-shrink-0 me-4">
                                                <div class="avatar-md">
                                                    <span class="avatar-title rounded-circle bg-light text-danger font-size-16">
                                                        <img src="assets/images/companies/img-1.png" alt="" height="30" />
                                                    </span>
                                                </div>
                                            </div>


                                            <div class="flex-grow-1 overflow-hidden">
                                                <h5 class="text-truncate font-size-15"><a href="javascript: void(0);" class="text-dark">New admin Design</a></h5>
                                                <p class="text-muted mb-4">It will be as simple as Occidental</p>
                                                <div class="avatar-group">
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-4.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-5.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <div class="avatar-xs">
                                                                <span class="avatar-title rounded-circle bg-success text-white font-size-16">
                                                                    A
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-2.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="px-4 py-3 border-top">
                                        <ul class="list-inline mb-0">
                                            <li class="list-inline-item me-3">
                                                <span class="badge bg-success">Completed</span>
                                            </li>
                                            <li class="list-inline-item me-3">
                                                <i class="bx bx-calendar me-1"></i> 15 Oct, 19
                                            </li>
                                            <li class="list-inline-item me-3">
                                                <i class="bx bx-comment-dots me-1"></i> 214
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-sm-6">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex">
                                            <div class="flex-shrink-0 me-4">
                                                <div class="avatar-md">
                                                    <span class="avatar-title rounded-circle bg-light text-danger font-size-16">
                                                        <img src="assets/images/companies/img-1.png" alt="" height="30" />
                                                    </span>
                                                </div>
                                            </div>


                                            <div class="flex-grow-1 overflow-hidden">
                                                <h5 class="text-truncate font-size-15"><a href="javascript: void(0);" class="text-dark">New admin Design</a></h5>
                                                <p class="text-muted mb-4">It will be as simple as Occidental</p>
                                                <div class="avatar-group">
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-4.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-5.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <div class="avatar-xs">
                                                                <span class="avatar-title rounded-circle bg-success text-white font-size-16">
                                                                    A
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-2.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="px-4 py-3 border-top">
                                        <ul class="list-inline mb-0">
                                            <li class="list-inline-item me-3">
                                                <span class="badge bg-success">Completed</span>
                                            </li>
                                            <li class="list-inline-item me-3">
                                                <i class="bx bx-calendar me-1"></i> 15 Oct, 19
                                            </li>
                                            <li class="list-inline-item me-3">
                                                <i class="bx bx-comment-dots me-1"></i> 214
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-sm-6">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex">
                                            <div class="flex-shrink-0 me-4">
                                                <div class="avatar-md">
                                                    <span class="avatar-title rounded-circle bg-light text-danger font-size-16">
                                                        <img src="assets/images/companies/img-1.png" alt="" height="30" />
                                                    </span>
                                                </div>
                                            </div>


                                            <div class="flex-grow-1 overflow-hidden">
                                                <h5 class="text-truncate font-size-15"><a href="javascript: void(0);" class="text-dark">New admin Design</a></h5>
                                                <p class="text-muted mb-4">It will be as simple as Occidental</p>
                                                <div class="avatar-group">
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-4.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-5.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <div class="avatar-xs">
                                                                <span class="avatar-title rounded-circle bg-success text-white font-size-16">
                                                                    A
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-2.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="px-4 py-3 border-top">
                                        <ul class="list-inline mb-0">
                                            <li class="list-inline-item me-3">
                                                <span class="badge bg-success">Completed</span>
                                            </li>
                                            <li class="list-inline-item me-3">
                                                <i class="bx bx-calendar me-1"></i> 15 Oct, 19
                                            </li>
                                            <li class="list-inline-item me-3">
                                                <i class="bx bx-comment-dots me-1"></i> 214
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-sm-6">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex">
                                            <div class="flex-shrink-0 me-4">
                                                <div class="avatar-md">
                                                    <span class="avatar-title rounded-circle bg-light text-danger font-size-16">
                                                        <img src="assets/images/companies/img-1.png" alt="" height="30" />
                                                    </span>
                                                </div>
                                            </div>


                                            <div class="flex-grow-1 overflow-hidden">
                                                <h5 class="text-truncate font-size-15"><a href="javascript: void(0);" class="text-dark">New admin Design</a></h5>
                                                <p class="text-muted mb-4">It will be as simple as Occidental</p>
                                                <div class="avatar-group">
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-4.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-5.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <div class="avatar-xs">
                                                                <span class="avatar-title rounded-circle bg-success text-white font-size-16">
                                                                    A
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-2.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="px-4 py-3 border-top">
                                        <ul class="list-inline mb-0">
                                            <li class="list-inline-item me-3">
                                                <span class="badge bg-success">Completed</span>
                                            </li>
                                            <li class="list-inline-item me-3">
                                                <i class="bx bx-calendar me-1"></i> 15 Oct, 19
                                            </li>
                                            <li class="list-inline-item me-3">
                                                <i class="bx bx-comment-dots me-1"></i> 214
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-sm-6">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex">
                                            <div class="flex-shrink-0 me-4">
                                                <div class="avatar-md">
                                                    <span class="avatar-title rounded-circle bg-light text-danger font-size-16">
                                                        <img src="assets/images/companies/img-1.png" alt="" height="30" />
                                                    </span>
                                                </div>
                                            </div>


                                            <div class="flex-grow-1 overflow-hidden">
                                                <h5 class="text-truncate font-size-15"><a href="javascript: void(0);" class="text-dark">New admin Design</a></h5>
                                                <p class="text-muted mb-4">It will be as simple as Occidental</p>
                                                <div class="avatar-group">
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-4.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-5.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <div class="avatar-xs">
                                                                <span class="avatar-title rounded-circle bg-success text-white font-size-16">
                                                                    A
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-2.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="px-4 py-3 border-top">
                                        <ul class="list-inline mb-0">
                                            <li class="list-inline-item me-3">
                                                <span class="badge bg-success">Completed</span>
                                            </li>
                                            <li class="list-inline-item me-3">
                                                <i class="bx bx-calendar me-1"></i> 15 Oct, 19
                                            </li>
                                            <li class="list-inline-item me-3">
                                                <i class="bx bx-comment-dots me-1"></i> 214
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-sm-6">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex">
                                            <div class="flex-shrink-0 me-4">
                                                <div class="avatar-md">
                                                    <span class="avatar-title rounded-circle bg-light text-danger font-size-16">
                                                        <img src="assets/images/companies/img-1.png" alt="" height="30" />
                                                    </span>
                                                </div>
                                            </div>


                                            <div class="flex-grow-1 overflow-hidden">
                                                <h5 class="text-truncate font-size-15"><a href="javascript: void(0);" class="text-dark">New admin Design</a></h5>
                                                <p class="text-muted mb-4">It will be as simple as Occidental</p>
                                                <div class="avatar-group">
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-4.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-5.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <div class="avatar-xs">
                                                                <span class="avatar-title rounded-circle bg-success text-white font-size-16">
                                                                    A
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-2.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="px-4 py-3 border-top">
                                        <ul class="list-inline mb-0">
                                            <li class="list-inline-item me-3">
                                                <span class="badge bg-success">Completed</span>
                                            </li>
                                            <li class="list-inline-item me-3">
                                                <i class="bx bx-calendar me-1"></i> 15 Oct, 19
                                            </li>
                                            <li class="list-inline-item me-3">
                                                <i class="bx bx-comment-dots me-1"></i> 214
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-sm-6">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex">
                                            <div class="flex-shrink-0 me-4">
                                                <div class="avatar-md">
                                                    <span class="avatar-title rounded-circle bg-light text-danger font-size-16">
                                                        <img src="assets/images/companies/img-1.png" alt="" height="30" />
                                                    </span>
                                                </div>
                                            </div>


                                            <div class="flex-grow-1 overflow-hidden">
                                                <h5 class="text-truncate font-size-15"><a href="javascript: void(0);" class="text-dark">New admin Design</a></h5>
                                                <p class="text-muted mb-4">It will be as simple as Occidental</p>
                                                <div class="avatar-group">
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-4.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-5.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <div class="avatar-xs">
                                                                <span class="avatar-title rounded-circle bg-success text-white font-size-16">
                                                                    A
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-2.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="px-4 py-3 border-top">
                                        <ul class="list-inline mb-0">
                                            <li class="list-inline-item me-3">
                                                <span class="badge bg-success">Completed</span>
                                            </li>
                                            <li class="list-inline-item me-3">
                                                <i class="bx bx-calendar me-1"></i> 15 Oct, 19
                                            </li>
                                            <li class="list-inline-item me-3">
                                                <i class="bx bx-comment-dots me-1"></i> 214
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-sm-6">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex">
                                            <div class="flex-shrink-0 me-4">
                                                <div class="avatar-md">
                                                    <span class="avatar-title rounded-circle bg-light text-danger font-size-16">
                                                        <img src="assets/images/companies/img-1.png" alt="" height="30" />
                                                    </span>
                                                </div>
                                            </div>


                                            <div class="flex-grow-1 overflow-hidden">
                                                <h5 class="text-truncate font-size-15"><a href="javascript: void(0);" class="text-dark">New admin Design</a></h5>
                                                <p class="text-muted mb-4">It will be as simple as Occidental</p>
                                                <div class="avatar-group">
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-4.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-5.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <div class="avatar-xs">
                                                                <span class="avatar-title rounded-circle bg-success text-white font-size-16">
                                                                    A
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-2.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="px-4 py-3 border-top">
                                        <ul class="list-inline mb-0">
                                            <li class="list-inline-item me-3">
                                                <span class="badge bg-success">Completed</span>
                                            </li>
                                            <li class="list-inline-item me-3">
                                                <i class="bx bx-calendar me-1"></i> 15 Oct, 19
                                            </li>
                                            <li class="list-inline-item me-3">
                                                <i class="bx bx-comment-dots me-1"></i> 214
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-sm-6">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex">
                                            <div class="flex-shrink-0 me-4">
                                                <div class="avatar-md">
                                                    <span class="avatar-title rounded-circle bg-light text-danger font-size-16">
                                                        <img src="assets/images/companies/img-1.png" alt="" height="30" />
                                                    </span>
                                                </div>
                                            </div>


                                            <div class="flex-grow-1 overflow-hidden">
                                                <h5 class="text-truncate font-size-15"><a href="javascript: void(0);" class="text-dark">New admin Design</a></h5>
                                                <p class="text-muted mb-4">It will be as simple as Occidental</p>
                                                <div class="avatar-group">
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-4.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-5.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <div class="avatar-xs">
                                                                <span class="avatar-title rounded-circle bg-success text-white font-size-16">
                                                                    A
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div class="avatar-group-item">
                                                        <a href="javascript: void(0);" class="d-inline-block">
                                                            <img src="assets/images/users/avatar-2.jpg" alt="" class="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="px-4 py-3 border-top">
                                        <ul class="list-inline mb-0">
                                            <li class="list-inline-item me-3">
                                                <span class="badge bg-success">Completed</span>
                                            </li>
                                            <li class="list-inline-item me-3">
                                                <i class="bx bx-calendar me-1"></i> 15 Oct, 19
                                            </li>
                                            <li class="list-inline-item me-3">
                                                <i class="bx bx-comment-dots me-1"></i> 214
                                            </li>
                                        </ul>
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