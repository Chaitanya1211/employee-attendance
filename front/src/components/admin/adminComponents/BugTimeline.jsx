import { useEffect, useState } from "react";
import axios from "axios";
import { toISTLocaleString } from "../../../helper/dates";

export function BugTimeLine({ bugId }) {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [history, setHistory] = useState([]);
    useEffect(() => {
        axios({
            url: `http://localhost:8080/admin/bug/history/${bugId}`,
            method: "GET",
            headers: {
                "token": token
            }
        }).then((response) => {
            if (response.status === 200) {
                setHistory(response.data?.history)
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
            <div class="row mt-4">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title mb-4">History</h5>
                            <div class="">
                                <ul class="verti-timeline list-unstyled">
                                    {
                                        history.length != 0 ?
                                            history.map((update, index) => {
                                                return (
                                                    <li class="event-list pb-2 ps-0" style={{ "marginLeft": "-12px" }}>
                                                        <div class="d-flex">
                                                            <div class="flex-shrink-0 me-3" style={{ "color": "#556ee6", "fontSize": "23px" }}>
                                                                {update.type === "COMMENT" &&
                                                                    <i class="fa-solid fa-comment"></i>
                                                                }
                                                                {update.type === "STATUS" &&
                                                                    <i class="fa-solid fa-arrow-right-arrow-left"></i>
                                                                }
                                                            </div>
                                                            <div class="flex-grow-1">
                                                                <div>
                                                                    <h5>{update.emp_f_name + " " + update.emp_l_name}</h5>
                                                                    <p class="mb-1">{update.data}</p>
                                                                    <p class="text-muted fs-8">{toISTLocaleString(update.time)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            }) :
                                            <>
                                                <h4>No Bug History Found</h4>
                                            </>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}