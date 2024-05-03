import { useEffect, useState } from "react";
import { TimeCard } from "../../helper/timeCard";
import { EmployeeSidebar } from "./EmployeeSidebar";
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from "axios";
export function EmployeeHome() {
    const [loginModal, setLoginModal] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [home, setHome] = useState([]);
    const [profile, setProfile] = useState([]);
    const [todayStatus, setTodayStatus] = useState([]);
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
                setHome(response.data);
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
    const markLogin = () => {
        // make request for login
        axios({
            url : "http://localhost:8080/employee/markLogin",
            method :"PUT",
            headers:{
                "Content-Type":"application/json",
                "token" : token
            }
        }).then((response)=>{
            console.log(response);
            if(response.status === 200){
                setTodayStatus(response.data.todayStatus);
            }
        }).catch((error)=>{
            console.log("Error : ", error);
            if(error.response && error.response.status === 500){
                console.log("Internal server error")
            }
        })
        setLoginModal(false)
    };


    const showLogoutModal = () =>{
      setLogoutModal(true);
    }

    const markLogout = () =>{
        axios({
            url : "http://localhost:8080/employee/markLogout",
            method :"PUT",
            headers:{
                "Content-Type":"application/json",
                "token" : token
            }
        }).then((response)=>{
            console.log(response);
            if(response.status === 200){
                setTodayStatus(response.data.todayStatus);
            }
        }).catch((error)=>{
            console.log("Error : ", error);
            if(error.response && error.response.status === 500){
                console.log("Internal server error")
            }
        })
        setLogoutModal(false)
    }
    return (
        <>
            <SweetAlert
                title={"Hello" +" "+profile.firstName}
                onConfirm={markLogin}
                show={loginModal}>
                Hello {profile.firstName + profile.lastName}
                <p>Mark Login</p>
            </SweetAlert>

            <SweetAlert
                title={"Hello" +" "+profile.firstName}
                onConfirm={markLogout}
                show={logoutModal}>
                Hello {profile.firstName + profile.lastName}
                <p>Mark Logout</p>
            </SweetAlert>

            <div className="d-flex">
                <div className="col-lg-2 position-fixed">
                    <EmployeeSidebar name={`${profile.firstName ?? ''} ${profile.lastName ?? ''}`}/>
                </div>

                <div className="col-lg-10" style={{ "marginLeft": "auto" }}>
                    <div className="col-lg-12 p-5">
                        <div className="d-flex justify-content-between">
                            {/* greeting column */}
                            <div className="col-lg-4">
                                <h4>Good Afternoon {profile.firstName ?? ''} !!!</h4>
                            </div>
                            {/* time and mark column */}
                            <div className="col-lg-3">
                                <TimeCard />
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}