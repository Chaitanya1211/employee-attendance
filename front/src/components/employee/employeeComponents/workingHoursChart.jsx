import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
export default function SampleBar({ render }) {
    const [token, setToken] = useState(localStorage.getItem("token") || '');

    // pagination
    const [paginatedItems, setPaginatedItems] = useState([]);
    const [pageSize, setPageSize] = useState(7);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [paginateLoader, setPaginateLoader] = useState(false)

    // chart data
    const [yData, setYData] = useState([]);
    const [xData, setXData] = useState([]);

    function calculateWorkingHours(loginTime, logoutTime) {
        const loginDateTime = new Date(`${loginTime} ${new Date().getFullYear()}`);
        if (!logoutTime) {
            return 0;
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
                    setTotalPage(response.data?.totalPages);
                    const [hours, days] = seriesAray(paginatedItems);
                    setYData(hours);
                    setXData(days);
                    console.log("X data:", xData);
                    console.log("Y data:", yData);
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
    const series = [
        {
            name: "Working Hours", //will be displayed on the y-axis
            data: yData
        }
    ];

    const options = {
        chart: {
            id: "simple-bar"
        },
        xaxis: {
            categories: xData
        }
    };

    function seriesAray(paginatedItems) {
        const hours = [];
        const date = [];
        paginatedItems.map((attendance) => {
            hours.push(calculateWorkingHours(attendance.login, attendance.logout));
            date.push(attendance.showDate);
        })
        return [hours, date];
    }
    return (
        <>
            {
                paginateLoader ? <>
                    Loading...
                </> : <>
                    <Chart options={options} type="line" series={series} width="80%" />
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary mx-2" onClick={previousPage} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <button className="btn btn-primary mx-2" onClick={nextPage} disabled={currentPage === totalPage}>
                            Next
                        </button>
                    </div>
                </>
            }

        </>

    );
}
