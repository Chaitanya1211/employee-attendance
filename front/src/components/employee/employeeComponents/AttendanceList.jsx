import axios from "axios";
import { useEffect, useState } from "react";
import { TableLoader } from "./TableLoader";

export function AttendanceList({render}) {
    const [token, setToken] = useState(localStorage.getItem("token") || '');

    // pagination
    const [paginatedItems, setPaginatedItems] = useState([]);
    const [pageSize, setPageSize] = useState(7);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [paginateLoader, setPaginateLoader] = useState(false)
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

    useEffect(() => {
        function getAttendance() {
            console.log("pAginate loader :", paginateLoader);
            setPaginateLoader(true);
            axios({
                url: `http://localhost:8080/employee/attendances?page=${currentPage}&pageSize=${pageSize}`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                }
            }).then((response) => {
                console.log("Attendcance data");
                console.log(response.data);
                if (response.status === 200) {
                    setPaginatedItems(response.data?.attendance);
                    setTotalPage(response.data?.totalPages)
                }
                setPaginateLoader(false);
            }).catch((error) => {
                console.log("Error :", error);
            })
        }
        getAttendance();
    }, [currentPage, pageSize, render]);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
        console.log("Page incermented", currentPage);
    }
    const previousPage = () => {
        setCurrentPage(currentPage - 1);
        console.log("Page decrements", currentPage);
    }
    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="mb-3 text-dark">History</h4>
                            <div className="row mb-2">
                                <div className="table-responsive">
                                    <table className="table align-middle table-nowrap table-hover dt-responsive nowrap w-100" id="userList-table">
                                        <thead className="table-light">
                                            <tr>
                                                <th scope="col" style={{ "width": "40px" }}>Sr. No.</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Login Time</th>
                                                <th scope="col">Logout Time</th>
                                                <th scope="col">Working Hours</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginateLoader ? 
                                            <>
                                                <tr>
                                                    <td colspan="5">
                                                        <TableLoader />
                                                    </td>
                                                </tr>
                                            </> 
                                            : 
                                            <>
                                                    {paginatedItems.map((att, index) => {
                                                        const workingHours = calculateWorkingHours(att.login, att.logout);
                                                        return (
                                                            <tr key={index}>
                                                                <td>{((currentPage - 1) * pageSize) + (index + 1)}</td>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <div>
                                                                            <h5 className="text-truncate font-size-14 mb-1">
                                                                                <a href="javascript: void(0);" className="text-dark">{att.showDate ?? att.today}</a>
                                                                            </h5>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>{att.login ?? "-"}</td>
                                                                <td>{att.logout ?? "-"}</td>
                                                                <td>{workingHours}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-primary mx-2" onClick={previousPage} disabled={currentPage === 1}>
                                        Previous
                                    </button>
                                    <button className="btn btn-primary mx-2" onClick={nextPage} disabled={currentPage === totalPage}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}