import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import axios from "axios";
import "../../css/custom.css"
export function AdminDashboard() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        axios({
            url: `http://localhost:8080/admin/invite/${email}`,
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            }
        }).then((response) => {
            console.log(response.data)
            setIsLoading(false);
            setTimeout(() => {
                setToastMessage('Email Sent Successfully');
            }, 2000);
        }).catch((error) => {
            console.log("Error :", error)
        })
    }
    return (
        <>
            <div className="d-flex">
                <div className="col-lg-2">
                    <AdminSidebar />
                </div>
                <div className="col-lg-10 p-5">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="card" id="emailSend">
                                <div className="card-body p-4">
                                    <h5 className="card-title mb-4">Invite Employee</h5>
                                    <form className="row row-cols-lg-auto g-3 align-items-center justify-content-end" onSubmit={handleSubmit}>
                                        <input type="text" className="form-control" id="autoSizingInput" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />

                                        <div className="col-12">
                                            <button type="submit" className="btn btn-primary w-md">Send Invite</button>
                                        </div>
                                    </form>

                                </div>
                                {isLoading && (
                                    <div id="loader-wrapper">
                                        <div className="spinner-border text-primary m-1" role="status"></div>
                                    </div>
                                )}

                                {toastMessage && (
                                    <div className="toast" role="alert" aria-live="assertive" aria-atomic="true" style={{ position: 'fixed', top: '10px', right: '10px' }}>
                                        <div className="toast-header">
                                            <strong className="mr-auto">Notification</strong>
                                            <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onClick={() => setToastMessage('')}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="toast-body">
                                            {toastMessage}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Show list of all employees */}

                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colspan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


        </>
    );

} 