import { useEffect, useState } from "react";
import { EmployeeSidebar } from "./EmployeeSidebar";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Priority, Status } from "../../helper/priority";
import { toISTLocaleString } from "../../helper/dates";

export function BugAction() {
    const { bugId } = useParams();
    const [bug, setBug] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [bugImages, setBugImages] = useState([]);
    const [allComments, setAllComments] = useState([]);
    const [showComment, setShowComment] = useState(false);
    const [comment, setComment] = useState('');
    useEffect(() => {
        axios({
            url: `http://localhost:8080/employee/bug/${bugId}`,
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

    const addInput = () => {
        setShowComment(true);
    }
    const saveComment = () => {
        const commentBody = {
            "bugId": bugId,
            "comment": comment
        }
        console.log(commentBody);
        axios({
            url: "http://localhost:8080/employee/addComment",
            method: "POST",
            data: commentBody,
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }).then((response) => {
            if(response.status === 201){
                console.log("Comment added successfully");
                setAllComments(response.data.comments);
                setShowComment(false);
            }
            console.log(response.data);
        }).catch((error) => {
            console.log("Error : ", error);
            if(response.error && response.error.status === 500){
                console.log("Error");
                setAllComments(response.data.comments);
                setShowComment(false);
            }
        })
    }
    return (
        <>
            <div className="d-flex">
                <div className="col-lg-2 position-fixed">
                    <EmployeeSidebar />
                </div>
                <div className="col-lg-10" style={{ "margin-left": "auto" }}>
                    <div className="col-lg-12 p-5">
                        <div class="row">
                            <div class="col-lg-12">
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
                                                    </> : <>NO images</>}
                                            </div>

                                            <div class="col-xl-6">
                                                <div class="mt-4 mt-xl-3">
                                                    <h4 class="mt-1 mb-3">{bug.title ?? ""}</h4>

                                                    <p class="text-muted mb-4">{bug.description ?? ""}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mt-5">
                                            <h5 class="mb-3">Details :</h5>

                                            <div class="table-responsive">
                                                <table class="table mb-0 table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row" style={{ "width": "200px" }}>Priority</th>
                                                            <td>{Priority(bug.priority)}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">QA Status</th>
                                                            <td>{Status(bug.qa_status)}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Dev Status</th>
                                                            <td>{Status(bug.dev_status)}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Latest Update</th>
                                                            <td>{toISTLocaleString(bug.latest_update)}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Raised On</th>
                                                            <td>{toISTLocaleString(bug.raised_on)}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Raised By</th>
                                                            <td>{bug.raisedByName ?? ""}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Assigned To</th>
                                                            <td>{bug.assignedToName ?? ""}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div class="mt-5">
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
                                                    <ul class="list-inline float-sm-end mb-sm-0 my-2">
                                                        <li class="list-inline-item">
                                                            <a href="javascript: void(0);" onClick={addInput}><i class="far fa-comment-dots me-1"></i> Comment</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {showComment && <>
                                                <form class="my-3" >
                                                    <div class="hstack gap-3">
                                                        <input class="form-control me-auto" type="text" placeholder="Add your comment here..."
                                                            aria-label="Add your comment here..." onChange={(e) => setComment(e.target.value)} />
                                                        <button type="button" class="btn btn-primary" onClick={saveComment}>Submit</button>
                                                        <div class="vr"></div>
                                                        <button type="reset" class="btn btn-outline-danger">Reset</button>
                                                    </div>
                                                </form>
                                            </>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}