import { useEffect, useState } from "react";
import { EmployeeSidebar } from "./EmployeeSidebar";
import axios from "axios";

export function EmployeeProfile() {
    const [employee, setEmployee] = useState([]);
    useEffect(()=>{
        const token= localStorage.getItem('token');
        axios({
            url : "http://localhost:8080/employee/profile",
            method : "GET",
            headers :{
                "Content-Type" : "application/json",
                "token" : token
            }
        }).then((response)=>{
            console.log(response)
            if(response.status === 200){
                // employee found
                setEmployee(response.data.profile);
                console.log("Employee :", employee);
            }
        }).catch((error)=>{
            console.log("Error in receiving response");
            console.log(error);
            if(response.error && response.error.status === 404){
                console.log("Employee not found")
            }else if(response.error && response.error.status === 500){
                console.log("Internal serve error")
            }
        })
    },[]);
    return (
        <>
            <div className="d-flex">
                <div className="col-lg-2">
                    <EmployeeSidebar name={employee.firstName + " " + employee.lastName} />
                </div>
                
                <div className="col-lg-10 p-5">
                    <div className="container rounded bg-white">
                        <div className="row">
                            <div className="col-md-3 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /><span className="font-weight-bold">{employee.firstName + " " +employee.middleName + " " +employee.lastName}</span><span className="text-black-50">{employee.email}</span><span className="text-black-50">{employee.contactNumber}</span></div>
                            </div>
                            <div className="col-md-9">
                                <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
                                    <h4 className="text-right px-3 m-0">Profile Settings</h4>
                                </div>
                                <div className="d-flex flex-wrap">
                                    <div className="col-md-7 border-right">
                                        <div className="p-3 py-1">
                                            <div className="border-bottom py-3">
                                                <h5>Personal Details</h5>
                                                <div className="row">
                                                    <div className="col-md-4 mb-2"><label className="labels">Name</label><input type="text" className="form-control" placeholder="first name" defaultValue={employee.firstName} readOnly disabled/></div>
                                                    <div className="col-md-4 mb-2"><label className="labels">Middle Name</label><input type="text" className="form-control" placeholder="Middle name" defaultValue={employee.middleName} readOnly /></div>
                                                    <div className="col-md-4 mb-2"><label className="labels">Surname</label><input type="text" className="form-control" placeholder="surname" defaultValue={employee.lastName}  readOnly disabled/></div>
                                                    <div className="col-md-12 mb-2"><label className="labels">Date Of Birth</label><input type="date" className="form-control" placeholder="enter phone number" defaultValue={employee.dateOfBirth} /></div>
                                                    <div className="col-md-12">
                                                        <label className="d-block mb-2">Gender <span class="text-danger"> *</span></label>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="male" checked={employee.gender === "male" ? true:false} />
                                                            <label className="form-check-label" for="inlineRadio1">Male</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="female" checked={employee.gender === "female" ? true:false}/>
                                                            <label className="form-check-label" for="inlineRadio2">Female</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-bottom py-3">
                                                <h5>Contact Details</h5>
                                                <div className="col-md-12 mb-2"><label className="labels">Email ID</label><input type="text" className="form-control" placeholder="enter email id"  defaultValue={employee.email} readOnly disabled /></div>
                                                <div className="col-md-12"><label className="labels">Mobile Number</label><input type="text" className="form-control" placeholder="enter phone number" defaultValue={employee.contactNumber} /></div>
                                            </div>

                                            <div className="border-bottom py-3">
                                                <h5>Emergency Contact</h5>
                                                <div className="col-md-12 mb-2"><label className="labels">Name</label><input type="text" className="form-control" placeholder="first name" defaultValue={employee.emerName}  /></div>
                                                <div className="col-md-12 mb-2"><label className="labels">Relation</label><input type="text" className="form-control" placeholder="first name" defaultValue={employee.emerRelation}  /></div>
                                                <div className="col-md-12"><label className="labels">Phone Number</label><input type="text" className="form-control" placeholder="first name" defaultValue={employee.emerPhoneNo}  /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="p-3 py-1">
                                            <div className="border-bottom py-3">
                                            <h5>Address</h5>
                                            <div className="col-md-12 mb-2"><label className="labels">Address Line 1</label><input type="text" className="form-control" placeholder="enter address line 1" defaultValue={employee.addline1} /></div>
                                            <div className="col-md-12 mb-2"><label className="labels">Address Line 2</label><input type="text" className="form-control" placeholder="Enter address line 2" defaultValue={employee.addline2} /></div>
                                            <div className="col-md-12 mb-2"><label className="labels">State</label><input type="text" className="form-control" placeholder="enter address line 2" defaultValue={employee.state} /></div>
                                            <div className="col-md-12 mb-2"><label className="labels">City</label><input type="text" className="form-control" placeholder="enter address line 2" defaultValue={employee.city} /></div>
                                            <div className="col-md-12"><label className="labels">Pin Code</label><input type="text" className="form-control" placeholder="enter address line 2" defaultValue={employee.postalCode} /></div>
                                            </div>
                                        </div>
                                        <div className="p-3 d-flex justify-content-end">
                                        <button className="btn btn-primary">Update Details</button>
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