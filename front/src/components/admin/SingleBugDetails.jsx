import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { BackBtn } from "../../helper/backButton";
import { Priority, Status } from "../../helper/priority";
import { toISTLocaleString } from "../../helper/dates";
import defaultImage from "../../assets/defaultImage.jpg";
import { AdminSidebar } from "./AdminSidebar";
import { BugTimeLine } from './adminComponents/BugTimeline';
export function SingleBugDetails(){
    const { bugId } = useParams();
    const [bug, setBug] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [bugImages, setBugImages] = useState([]);
    const [allComments, setAllComments] = useState([]);

    useEffect(() => {
        axios({
            url: `http://localhost:8080/admin/bug/${bugId}`,
            method: "GET",
            headers: {
                "token": token
            }
        }).then((response) => {
            if (response.status === 200) {
                setBug(response?.data?.bug[0]);
                setBugImages(response.data.bug[0].images);
                setAllComments(response.data.comments);
                console.log("Bug :", response.data)
            }
        }).catch((error) => {
            console.error("Error :", error)
            if (error.response && error.response.status === 404) {
                console.log("Bug not found")
            } else if (error.response && error.response.status === 500) {
                console.log("Internal server error");
            }
        })
    }, [])

    return (
        <>
            <div className="d-flex">
                <div className="col-lg-2 position-fixed">
                    <AdminSidebar />
                </div>
                <div className="col-lg-10" style={{ "margin-left": "auto" }}>
                    <div className="col-lg-12 p-5">
                        <div class="row">
                            <div class="col-lg-12">
                            <div class="col-12">
                                <div class="page-title-box d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <BackBtn />
                                        <h4 class="mb-0 font-size-18">Bug overview</h4>
                                    </div>

                                    <div class="page-title-right">
                                        <ol class="breadcrumb m-0">
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Bug</a></li>
                                            <li class="breadcrumb-item active">Project</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>

                                <div class="card">
                                    <div class="card-body p-4">
                                        <div class="row">
                                            <div class="col-xl-6">
                                                {bugImages.length > 0 ?
                                                    <>
                                                        <div class="product-detai-imgs">
                                                            <div class="row">
                                                                <div class="col-md-2 col-sm-3 col-4">
                                                                    <div class="nav flex-column nav-pills " id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                                        {
                                                                            bugImages.map((image, index) => {
                                                                                return (
                                                                                    <a class={index == 0 ? "nav-link active" : "nav-link"} id={`product-${index + 1}-tab`} data-bs-toggle="pill" href={`#product-${index + 1}`} role="tab" aria-controls={`product-${index + 1}`} aria-selected="true">
                                                                                        <img src={image} alt="" class="img-fluid mx-auto d-block rounded" />
                                                                                    </a>
                                                                                );
                                                                            })
                                                                        }
                                                                        {/* "nav-link active" */}
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-7 offset-md-1 col-sm-9 col-8">
                                                                    <div class="tab-content" id="v-pills-tabContent">
                                                                        {
                                                                            bugImages.map((image, index) => {
                                                                                return (
                                                                                    <div class={index == 0 ? "tab-pane fade show active" : "tab-pane fade"} id={`product-${index + 1}`} role="tabpanel" aria-labelledby={`product-${index + 1}-tab`}>
                                                                                        <div>
                                                                                            <img src={image} alt="" class="img-fluid mx-auto d-block" />
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            })
                                                                        }
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </> : <><h5 class="text-center">No Images available</h5></>}
                                            </div>

                                            <div class="col-xl-6">
                                                <div className="row">
                                                    <div className="col-lg-8">
                                                        <div class="mt-4 mt-xl-3">
                                                            <h4 class="mt-1 mb-3">{bug.title ?? ""}</h4>
                                                            <p class="text-muted mb-4">{bug.description ?? ""}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div class="py-2 border-bottom">
                                                            <h6 class="mb-1">Priority</h6>
                                                            {Priority(bug.priority)}
                                                        </div>
                                                        <div class="py-2 border-bottom">
                                                            <h6 class="mb-1">QA Status</h6>
                                                            {Status(bug.qa_status)}
                                                        </div>
                                                        <div class="py-2 border-bottom">
                                                            <h6 class="mb-1">Developer status</h6>
                                                            {Status(bug.dev_status)}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 mt-3">
                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <h6 className="mb-2">Raised By</h6>
                                                                <div class="d-flex align-items-center">
                                                                    <div class="avatar-sm rounded p-1">
                                                                        <img src={bug.raisedByProfile ?? defaultImage} alt="Profile" class="img-fluid rounded-circle" />
                                                                    </div>
                                                                    <div class="ps-3">
                                                                        <h5 class="text-truncate font-size-14 m-0">
                                                                            <a href="javascript: v  oid(0);" class="text-dark">{bug.raisedByName + " " + bug.raisedBylastName}</a>
                                                                        </h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <h6 className="mb-2">Assigned To</h6>
                                                                <div class="d-flex align-items-center">
                                                                    <div class="avatar-sm rounded p-1">
                                                                        <img src={bug.assignedToProfile ?? defaultImage} alt="Project Icon" class="img-fluid rounded-circle" />
                                                                    </div>
                                                                    <div class="ps-3">
                                                                        <h5 class="text-truncate font-size-14 m-0">
                                                                            <a href="javascript: v  oid(0);" class="text-dark">{bug.assignedToName + " " + bug.assignedTolastName}</a>
                                                                        </h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mt-4">
                                            <div class="col-lg-12">
                                                {/* <div class="card"> */}
                                                <div class="card-body">
                                                    <h5 class="card-title mb-3">Update Status</h5>
                                                    <form class="row row-cols-lg-auto g-3 align-items-center justify-content-evenly">
                                                        {/* Latest update */}
                                                        <div class="col-lg-3">
                                                            <h6>Latest Update</h6>
                                                            {bug.updated_by != null ? <>
                                                                <div class="d-flex align-items-center">
                                                                    <div class="avatar-sm bg-light rounded p-2">
                                                                        <img src={bug.updatedByProfile ?? "../../assets/sampleProject.jpg"} alt="Profile" class="img-fluid rounded-circle" />
                                                                    </div>
                                                                    <div class="ps-3">
                                                                        <h5 class="text-truncate font-size-14 m-0">
                                                                            <a href="javascript: v  oid(0);" class="text-dark">{bug.updatedByName + " " + bug.updatedByLastName}</a>
                                                                        </h5>
                                                                        <p class="text-muted mb-0">{Status(bug.current_status)}</p>
                                                                        <small class="text-muted mb-0">{toISTLocaleString(bug.latest_update)}</small>
                                                                    </div>
                                                                </div>
                                                            </> : <>N/A</>}
                                                        </div>

                                                        {/* QA status */}
                                                        <div class="col-lg-3">
                                                            <h6>QA Status</h6>
                                                            <select class="form-select" disabled>
                                                                <option value="OPEN" selected={bug.qa_status === "OPEN"}>OPEN</option>
                                                                <option value="RECHECKING" selected={bug.qa_status === "RECHECKING"}>RECHECKING</option>
                                                                <option value="CLOSED" selected={bug.qa_status === "CLOSED"}>CLOSED</option>
                                                            </select>
                                                        </div>
                                                        {/* Developer status */}
                                                        <div class="col-lg-3">
                                                            <h6>Developer Status</h6>
                                                            <select class="form-select" disabled >
                                                                <option value="INVALID" selected={bug.dev_status === "INVALID"}>INVALID</option>
                                                                <option value="INPROGRESS" selected={bug.dev_status === "INPROGRESS"}>INPROGRESS</option>
                                                                <option value="DONE" selected={bug.dev_status === "DONE"}>DONE</option>
                                                            </select>
                                                        </div>
                                                        <button type="submit" class="btn btn-primary w-md" disabled>Submit</button>
                                                    </form>

                                                </div>
                                                {/* </div> */}
                                            </div>
                                        </div>
                                        <div class="mt-4">
                                            <h5>Comments</h5>
                                            <div class="d-flex">
                                                <div class="flex-grow-1">
                                                    {allComments.length > 0 ? <>

                                                        {allComments.map((comment, index) => {
                                                            return (
                                                                <div class="d-flex py-3 border-bottom">
                                                                    <div class="flex-shrink-0 me-3">
                                                                        <img src={comment.employee.profileImg} class="avatar-xs rounded-circle" alt="img" />
                                                                    </div>

                                                                    <div class="flex-grow-1">
                                                                        <h5 class="mb-1 font-size-15">{comment.employee.firstName + " " + comment.employee.lastName}</h5>
                                                                        <p class="text-muted mb-2">{comment.comment ?? ""}</p>
                                                                        <div class="text-muted font-size-12"><i class="far fa-calendar-alt text-primary me-1"></i>{toISTLocaleString(comment.at)}</div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}

                                                    </> : <h4> No comments yet </h4>}
                                                </div>
                                            </div>
                                        </div>
                                        <BugTimeLine bugId={bugId} />
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