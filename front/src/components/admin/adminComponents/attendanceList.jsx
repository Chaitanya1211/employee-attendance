import { useEffect, useState } from "react";
import axios from 'axios';
import { TableLoader } from "./TableLoader";

export function Attendance({email}) {
    const [today, setToday] = useState(getCurrentDateAndDayFormatted());
    console.log("Today :", today);
    const [token, setToken] = useState(localStorage.getItem('token') || "");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [attendance, setAttendance] = useState([]);
    const [totalPages, settotalPages] = useState(0);
    const [paginateLoader, setPaginateLoader] = useState(false);
    const [reRender, setRerender] = useState(false);
    useEffect(() => {
        setPaginateLoader(true);
        const requestBody = {
            "email": email
        };

        axios({
            url: `http://localhost:8080/admin/employee/attendance?page=${page}&pageSize=${pageSize}`,
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "token": token
            },
            data: requestBody
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                setAttendance(response.data.attendance);
                settotalPages(response.data?.totalPages);
            }
            setPaginateLoader(false);
        }).catch((error) => {
            console.log("Error :", error)
        })
    }, [page, reRender])

    function markLogin(){
        setPaginateLoader(true);
        const requestBody = {
            "email": email
        };

        axios({
            url: `http://localhost:8080/admin/markLogin`,
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "token": token
            },
            data: requestBody
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                setRerender((prev) => !prev)
            }
            setPaginateLoader(false);
        }).catch((error) => {
            console.log("Error :", error)
        })
    }

    function markLogout(){
        setPaginateLoader(true);
        const requestBody = {
            "email": email
        };

        axios({
            url: `http://localhost:8080/admin/markLogout`,
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "token": token
            },
            data: requestBody
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                setRerender((prev) => !prev)
            }
            setPaginateLoader(false);
        }).catch((error) => {
            console.log("Error :", error)
        })
    }

    function calculateWorkingHours(loginTime, logoutTime) {
        const loginDateTime = new Date(`${loginTime} ${new Date().getFullYear()}`);
        if (!logoutTime) {
            return '-';
        }
        const logoutDateTime = new Date(`${logoutTime} ${new Date().getFullYear()}`);
        const timeDifference = logoutDateTime - loginDateTime;
        const workingHours = timeDifference / (1000 * 60 * 60);
        return workingHours.toFixed(2);
    }

    function getCurrentDateAndDayFormatted() {
        const currentDate = new Date();
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
          timeZone: 'Asia/Kolkata'
        };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);
        const formattedDateWithoutOrdinal = formattedDate.replace(/(\d{1,2})(th|st|nd|rd)/, '$1');
        return formattedDateWithoutOrdinal;
      }

    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="row mb-2">
                            <div className="table-responsive">
                                <table className="table align-middle table-nowrap table-hover dt-responsive nowrap w-100" id="userList-table">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col" style={{ "width": "40px" }}>Sr. No.</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Login Time</th>
                                            <th scope="col">Logout Time</th>
                                            <th scope="col">Working Hours</th>
                                            <th scope="col">Mark Attendance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginateLoader ? 
                                            <tr>
                                                <td colspan="7">
                                                    <TableLoader />
                                                </td>
                                            </tr> : <>
                                            {attendance.map((att, index) => {
                                            const workingHours = calculateWorkingHours(att.login, att.logout);
                                            return (
                                                <tr key={index}>
                                                    <td>{((page - 1) * pageSize) + (index + 1)}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div>
                                                                <h5 className="text-truncate font-size-14 mb-1">
                                                                    <a href="javascript: void(0);" className="text-dark">{att.showDate ?? att.today}</a>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{att.login ? <span class="badge bg-success">Present</span> : <span class="badge bg-danger">Absent</span>}</td>
                                                    <td>{att.login ?? "-"}</td>
                                                    <td>{att.logout ?? "-"}</td>
                                                    <td>{workingHours}</td>
                                                    <td>
                                                        <div className="d-flex">
                                                            <button className="btn btn-success me-2" disabled={today != att.showDate || att.isLoggedIn} onClick={markLogin}><i class="fa-solid fa-right-to-bracket"></i></button>
                                                            <button className="btn btn-danger" disabled={today != att.showDate || att.isLoggedOut} onClick={markLogout}><i class="fa-solid fa-right-from-bracket"></i></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                            </>
                                        }
                                        
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 