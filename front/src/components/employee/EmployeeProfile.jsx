import { useEffect, useState, useRef } from "react";
import { EmployeeSidebar } from "./EmployeeSidebar";
import axios from "axios";
import { useForm } from "react-hook-form";
import profileSchema from "../../helper/profileValidator";
import { yupResolver } from '@hookform/resolvers/yup';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Loader } from "../../helper/loader";
import noProfile from '../../assets/no-profile.png';
export function EmployeeProfile() {
    const [employee, setEmployee] = useState([]);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(profileSchema)
    });
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showWarningAlert, setShowWarningAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [loader, showLoader] = useState(false);
    const [defaultImage, setDefaultImage] = useState(noProfile);
    const [imageLoader, setImageLoader] = useState(true);

    const onConfirm = () => {
        setShowSuccessAlert(false);
        setShowWarningAlert(false);
        window.location.reload();
    };

    const hideAlert = () => {
        // Handle hideAlert action
        setShowErrorAlert(false)
    };


    const fileInputRef = useRef();
    const handleChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setDefaultImage(reader.result);
            };
            reader.readAsDataURL(selectedFile);
            setValue('profileImg', selectedFile);
          }
    }

    const handleLoad = () => {
        setImageLoader(false);
    };
    useEffect(() => {
        axios({
            url: "http://localhost:8080/employee/profile",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                // employee found
                setEmployee(response.data.profile);
                console.log("Employee :", employee);
            }
        }).catch((error) => {
            console.log("Error in receiving response");
            console.log(error);
            if (response.error && response.error.status === 404) {
                console.log("Employee not found")
            } else if (response.error && response.error.status === 500) {
                console.log("Internal server error")
            }
        })
    }, []);

    useEffect(() => {
        if (employee) {
            // Populate form with employee data
            Object.keys(employee).forEach(field => {
                setValue(field, employee[field]);
            });
        }
    }, [employee, setValue]);

    const onFormSubmit = (data) => {
        showLoader(true);
        axios({
            method: "PUT",
            url: "http://localhost:8080/employee/profileUpdate",
            headers: {
                "Content-Type": "multipart/form-data",
                "token": token
            },
            data: data
        }).then((response) => {
            showLoader(false);
            if (response.status === 200) {
                // setMessage(response.data.message); // Profile Details Updated
                setShowSuccessAlert(true);
            } else if (response.status === 404) {
                // setMessage(response.data.message); // Profile details not updated
                setShowWarningAlert(true);
            } else if (response.status === 500) {
                // setMessage('Internal server error');
                setShowErrorAlert(true);
            }
            console.log(response)
        }).catch((error) => {
            showLoader(false);
            console.log("Error :", error)

        })
    };


    const onErrors = errors => console.error(errors);

    return (
        <>
            <SweetAlert
                success
                title="Profile Updated"
                show={showSuccessAlert}
                onConfirm={onConfirm}
            >
                Details updated successfully
            </SweetAlert>
            <SweetAlert
                warning
                confirmBtnText="OK"
                confirmBtnBsStyle="success"
                title="Details not found"
                show={showWarningAlert}
                onConfirm={onConfirm}
            >
                Details not found. Please login again
            </SweetAlert>
            <SweetAlert
                danger
                title="Internal Server Error"
                show={showErrorAlert}
                onConfirm={hideAlert}
            >
                We are facing some internal errors. Please try again later
            </SweetAlert>
            
            {loader && <Loader/>}
            <div className="d-flex">
                <div className="col-lg-2 position-fixed">
                    <EmployeeSidebar name={employee.firstName + " " + employee.lastName} />
                </div>
                <div className="col-lg-10" style={{ "margin-left": "auto" }}>
                    <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
                        <div className="col-lg-12 p-5">
                            <div className="container rounded bg-white p-4">
                                <div className="row">
                                    <div className="col-md-3 border-right">
                                        <div className="d-flex flex-column align-items-center text-center p-3 py-4">
                                            <div className="image-parent">
                                                {imageLoader && <p>Loading...</p>}
                                                <img className="rounded-circle mt-5" width="150px"
                                                    src={employee.profileImg ?? defaultImage}
                                                    onLoad={handleLoad}
                                                    alt="Profile I"
                                                />
                                                <button onClick={() => fileInputRef.current.click()} type="button" className="edit-btn px-2 py-1"><i class="fa-solid fa-pen"></i></button>
                                                <input onChange={handleChange} multiple={false} ref={fileInputRef} type='file' hidden accept="image/*" />
                                            </div>
                                            <span className="fw-semibold dark-text mt-3">{employee.firstName + " " + employee.middleName + " " + employee.lastName}</span>
                                            <span className="text-black-50">{employee.role}</span>
                                            <span className="text-black-50">{employee.email}</span>
                                            <span className="text-black-50">{employee.contactNumber}</span></div>
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
                                                            <div className="col-md-4 mb-2"><label className="labels">Name</label><span class="text-danger"> *</span><input type="text" className="form-control" placeholder="first name" {...register('firstName')} readOnly disabled /></div>
                                                            <div className="col-md-4 mb-2"><label className="labels">Middle Name</label><input type="text" className="form-control" placeholder="Middle name" {...register('middleName')} /></div>
                                                            <div className="col-md-4 mb-2"><label className="labels">Surname</label><span class="text-danger"> *</span><input type="text" className="form-control" placeholder="surname" {...register('lastName')} readOnly disabled /></div>
                                                            <div className="col-md-12 mb-2"><label className="labels">Date Of Birth</label><span class="text-danger"> *</span><input type="date" className="form-control" placeholder="enter phone number" {...register('dateOfBirth')} readOnly disabled /></div>
                                                            <div className="col-md-12">
                                                                <label className="d-block mb-2">Gender <span class="text-danger"> *</span></label>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="male" checked={employee.gender === "male" ? true : false} />
                                                                    <label className="form-check-label" for="inlineRadio1">Male</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="female" checked={employee.gender === "female" ? true : false} />
                                                                    <label className="form-check-label" for="inlineRadio2">Female</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="border-bottom py-3">
                                                        <h5>Contact Details</h5>
                                                        <div className="col-md-12 mb-2"><label className="labels">Email ID</label><span class="text-danger"> *</span><input type="text" className="form-control" placeholder="enter email id" {...register('email')} readOnly disabled /></div>
                                                        <div className="col-md-12"><label className="labels">Mobile Number</label><span class="text-danger"> *</span><input type="text" className="form-control" placeholder="enter phone number" {...register('contactNumber')} />
                                                            <small className="text-danger">
                                                                {errors?.contactNumber && errors.contactNumber.message}
                                                            </small>
                                                        </div>
                                                    </div>

                                                    <div className="border-bottom py-3">
                                                        <h5>Emergency Contact</h5>
                                                        <div className="col-md-12 mb-2"><label className="labels">Name</label><span class="text-danger"> *</span><input type="text" className="form-control" placeholder="first name" {...register('emerName')} /><small className="text-danger">
                                                            {errors?.emerName && errors.emerName.message}
                                                        </small></div>
                                                        <div className="col-md-12 mb-2"><label className="labels">Relation</label><span class="text-danger"> *</span><input type="text" className="form-control" placeholder="first name"  {...register('emerRelation')} /><small className="text-danger">
                                                            {errors?.emerRelation && errors.emerRelation.message}
                                                        </small></div>
                                                        <div className="col-md-12"><label className="labels">Phone Number</label><span class="text-danger"> *</span><input type="text" className="form-control" placeholder="first name" {...register('emerPhoneNo')} /><small className="text-danger">
                                                            {errors?.emerPhoneNo && errors.emerPhoneNo.message}
                                                        </small></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="p-3 py-1">
                                                    <div className="border-bottom py-3">
                                                        <h5>Address</h5>
                                                        <div className="col-md-12 mb-2"><label className="labels">Address Line 1</label><span class="text-danger"> *</span><input type="text" className="form-control" placeholder="enter address line 1" {...register('addline1')} /><small className="text-danger">
                                                            {errors?.addline1 && errors.addline1.message}
                                                        </small></div>
                                                        <div className="col-md-12 mb-2"><label className="labels">Address Line 2</label><input type="text" className="form-control" placeholder="Enter address line 2"  {...register('addline2')} /></div>
                                                        <div className="col-md-12 mb-2"><label className="labels">State</label><span class="text-danger"> *</span><input type="text" className="form-control" placeholder="enter address line 2"  {...register('state')} /><small className="text-danger">
                                                            {errors?.state && errors.state.message}
                                                        </small></div>
                                                        <div className="col-md-12 mb-2"><label className="labels">City</label><span class="text-danger"> *</span><input type="text" className="form-control" placeholder="enter address line 2"  {...register('city')} /><small className="text-danger">
                                                            {errors?.city && errors.city.message}
                                                        </small></div>
                                                        <div className="col-md-12"><label className="labels">Pin Code</label><span class="text-danger"> *</span><input type="text" className="form-control" placeholder="enter address line 2" {...register('postalCode')} /><small className="text-danger">
                                                            {errors?.postalCode && errors.postalCode.message}
                                                        </small></div>
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
                    </form>

                </div>
            </div>
        </>
    )
}