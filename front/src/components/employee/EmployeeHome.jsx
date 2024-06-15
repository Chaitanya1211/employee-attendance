import { useEffect, useState } from "react";
import { TimeCard } from "../../helper/timeCard";
import { EmployeeSidebar } from "./EmployeeSidebar";
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from "axios";
import { AttendanceList } from "./employeeComponents/AttendanceList";
import GreetingMessage from "./employeeComponents/EmployeeGreeting";
import SingleCapture from "./employeeComponents/SingleCapture";
import { Loader } from "../../helper/loader";
import noProfile from "../../assets/no-profile.png";
export function EmployeeHome() {
    const [loginModal, setLoginModal] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [profile, setProfile] = useState([]);
    const [todayStatus, setTodayStatus] = useState([]);
    const [image, setImage] = useState();
    const [loader, setLoader] = useState(false);
    const [reRender, setReRender] = useState(true);

    const [showWarningAlert, setShowWarningAlert] = useState(false);

    useEffect(() => {
        axios({
            url: "http://localhost:8080/employee/home",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                setProfile(response?.data?.profile);
                setTodayStatus(response.data.todayStatus);
            }
        }).catch((error) => {
            console.log("Error :", error);
            if (error.response && error.response.status === 500) {
                console.log("Internal server error")
            } else if (error.response && error.response.status === 404) {
                console.log("Not found details")
            }
        })
    }, []);

    const showLoginModal = () => {
        setLoginModal(true);
    }

    const hideLoginModal = () => {
        setLoginModal(false);
    }

    const handleCapture = (capturedImages) => {
        setImage(capturedImages);
    };
    const markLogin = () => {
        // make request for login
        setLoader(true);
        const body = {
            "image": image
        }
        axios({
            url: "http://localhost:8080/employee/markLogin",
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
            data: body
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                setTodayStatus(response.data.todayStatus);
                setLoginModal(false);
                setReRender((prev) => !prev);
            }
            setLoader(false);
        }).catch((error) => {
            console.log("Error : ", error);
            if (error.response && error.response.status === 500) {
                console.log("Internal server error")
                setLoginModal(false);
                setShowWarningAlert(true);
            }
            setLoader(false);
        })
    };
    const onConfirm = () => {
        setShowWarningAlert(false);
    }
    const showLogoutModal = () => {

        setLogoutModal(true);
    }
    const hideLogoutModal = () => {
        setLogoutModal(false);
    }

    const markLogout = () => {
        axios({
            url: "http://localhost:8080/employee/markLogout",
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                setTodayStatus(response.data.todayStatus);
                setReRender((prev) => !prev);
            }
        }).catch((error) => {
            console.log("Error : ", error);
            if (error.response && error.response.status === 500) {
                console.log("Internal server error")
            }
        })
        setLogoutModal(false)
    }

    return (
        <>
            <SweetAlert
                custom
                showCancel
                show={loginModal}
                confirmBtnText="Login"
                cancelBtnText="Cancel"
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="light"
                onConfirm={markLogin}
                onCancel={hideLoginModal}
            >
                <div class="card">
                    <div class="card-body">
                        <div className="d-flex align-items-center justify-content-center">
                            <div className="col-lg-3">
                                <img src={profile.profileImg ?? noProfile} alt="Profile.png" height="50" class="mx-auto d-block rounded-circle" />
                            </div>
                            <div className="col-lg-6 text-start">
                                <h6 class="mb-1">{profile.firstName + " "}
                                    {profile.lastName}</h6>
                                <h6 class="text-muted fs-14 mb-0"> <b>{profile.role ?? "Not assigned"}</b></h6>
                            </div>
                        </div>
                        <SingleCapture onCapture={handleCapture} />
                    </div>
                </div>
            </SweetAlert>
            <SweetAlert
                custom
                showCancel
                show={logoutModal}
                confirmBtnText="Logout"
                cancelBtnText="Cancel"
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="light"
                onConfirm={markLogout}
                onCancel={hideLogoutModal}
            >
                <div class="card">
                    <div class="card-body">
                        <div class="text-center">
                            <img src={profile.profileImg ?? noProfile} alt="Profile.png" height="150" class="mx-auto d-block rounded-circle" />
                            <h5 class="mt-3 mb-1">{profile.firstName + " "}
                                {profile.middleName && profile.middleName + " "}
                                {profile.lastName}</h5>
                            <p class="text-muted fs-14 mb-0"> <b>{profile.role ?? "Not assigned"}</b></p>
                            <p class="text-muted fs-14 mb-0">{profile.email}</p>
                        </div>
                    </div>
                </div>
            </SweetAlert>

            <SweetAlert
                warning
                confirmBtnText="OK"
                confirmBtnBsStyle="success"
                title="Unable to Mark Attendance"
                show={showWarningAlert}
                onConfirm={onConfirm}
            >
                We are uanble to mark your attendance. Please try again later
            </SweetAlert>

            {loader && <Loader />}
            <div className="d-flex">
                <div className="col-lg-2 position-fixed">
                    <EmployeeSidebar name={`${profile.firstName ?? ''} ${profile.lastName ?? ''}`} />
                </div>

                <div className="col-lg-10" style={{ "marginLeft": "auto" }}>
                    <div className="col-lg-12 p-5">
                        <div className="d-flex justify-content-between">
                            {/* greeting column */}
                            <div className="col-lg-5">
                                <GreetingMessage name={profile.firstName ?? ''} />
                            </div>
                            {/* time and mark column */}
                            <div className="col-lg-6">
                                <div className="d-flex">
                                    <div className="col-lg-6">
                                        <div className="d-flex mt-3">
                                            <div className="col-lg-6 text-center">
                                                <button className="btn btn-success" disabled={todayStatus.isLoggedIn} onClick={showLoginModal} >Login</button>
                                                <p className="mt-1">
                                                    <b>{todayStatus.isLoggedIn ? todayStatus.login : ""}</b>
                                                </p>
                                            </div>
                                            <div className="col-lg-6 text-center">
                                                <button className="btn btn-danger" disabled={todayStatus.isLoggedIn ? (todayStatus.isLoggedOut ? true : false) : true} onClick={showLogoutModal}>Logout</button>
                                                <p className="mt-1">
                                                    <b>{todayStatus.isLoggedOut ? todayStatus.logout : ""}</b>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <TimeCard />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <AttendanceList render={reRender} />

                    </div>
                </div>
            </div>
        </>
    );
}