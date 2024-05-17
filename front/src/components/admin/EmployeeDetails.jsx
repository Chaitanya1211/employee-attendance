import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { Attendance } from './adminComponents/attendanceList';
export function EmployeeDetails() {
    const { email } = useParams();
    const [token, setToken] = useState(localStorage.getItem('token') || "");
    const [profile,setProfile] = useState([]);
    const [attendance, setAttendance] = useState([]);
    useEffect(() => {
        const requestBody = {
            "employee": email
        };
        axios({
            url: 'http://localhost:8080/admin/employee',
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "token": token
            },
            data: requestBody
        }).then((response) => {
            console.log(response);
            if(response.status === 200){
                setProfile(response.data.profile);
                setAttendance(response.data.attendance);
            }
        }).catch((error) => {
            console.log("Error :", error)
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
                            <div class="col-xl-4">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="text-center">
                                            <img src={profile.profileImg ?? ''} alt="Profile.png" height="150" class="mx-auto d-block rounded-circle" />
                                            <h5 class="mt-3 mb-1">{profile.firstName + " " + profile.middleName + " " + profile.lastName}</h5>
                                        </div>

                                        <ul class="list-unstyled mt-4">
                                            <li>
                                                <div class="d-flex">
                                                    <i class="bx bx-phone text-primary fs-4"></i>
                                                    <div class="ms-3">
                                                        <h6 class="fs-14 mb-2">Phone</h6>
                                                        <p class="text-muted fs-14 mb-0">{profile.contactNumber}</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="mt-3">
                                                <div class="d-flex">
                                                    <i class="bx bx-mail-send text-primary fs-4"></i>
                                                    <div class="ms-3">
                                                        <h6 class="fs-14 mb-2">Email</h6>
                                                        <p class="text-muted fs-14 mb-0">{profile.email}</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="mt-3">
                                                <div class="d-flex">
                                                    <i class="bx bx-globe text-primary fs-4"></i>
                                                    <div class="ms-3">
                                                        <h6 class="fs-14 mb-2">Date Of Birth</h6>
                                                        <p class="text-muted fs-14 text-break mb-0">{profile.dateOfBirth}</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="mt-3">
                                                <div class="d-flex">
                                                    <i class="bx bx-map text-primary fs-4"></i>
                                                    <div class="ms-3">
                                                        <h6 class="fs-14 mb-2">Address</h6>
                                                        <p class="text-muted fs-14 mb-0">{profile.state+ "," + profile.city +","+profile.postalCode}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-body">
                                        <div className="border-bottom">
                                            <h5 class="mb-3">Emergency Details</h5>
                                        </div>
                                        <ul class="list-unstyled mt-4">
                                            <li>
                                                <div class="d-flex">
                                                    <i class="bx bx-phone text-primary fs-4"></i>
                                                    <div class="ms-3">
                                                        <h6 class="fs-14 mb-2">Name</h6>
                                                        <p class="text-muted fs-14 mb-0">{profile.emerName}</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="mt-3">
                                                <div class="d-flex">
                                                    <i class="bx bx-mail-send text-primary fs-4"></i>
                                                    <div class="ms-3">
                                                        <h6 class="fs-14 mb-2">Relation</h6>
                                                        <p class="text-muted fs-14 mb-0">{profile.emerRelation}</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="mt-3">
                                                <div class="d-flex">
                                                    <i class="bx bx-globe text-primary fs-4"></i>
                                                    <div class="ms-3">
                                                        <h6 class="fs-14 mb-2">Phone</h6>
                                                        <p class="text-muted fs-14 text-break mb-0">{profile.emerPhoneNo}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-8">
                                <div class="card">
                                    <div class="card-body border-bottom">
                                        <div class="d-flex">
                                            <div class="flex-grow-1 ms-3">
                                                <h5 class="fw-semibold m-0">Attendance Details</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body"> 
                                        <Attendance attendance={attendance} />
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