export function AttendanceList({attendance}){
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
                                                        {attendance.map((att, index) => {
                                                            const workingHours = calculateWorkingHours(att.login, att.logout);
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
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

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        </>
    );
}