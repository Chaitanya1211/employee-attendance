import axios from "axios";
import { useState } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';
import { useParams } from 'react-router-dom';
import { Base64 } from "js-base64";
import { useForm } from "react-hook-form";
import registerSchema from '../../helper/registerValidator';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader } from "../../helper/loader";
export function EmployeeRegister() {
    const { urlEmail } = useParams();
    console.log(urlEmail);
    const email = Base64.decode(urlEmail);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    });

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showWarningAlert, setShowWarningAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const [loader, setLoader] = useState(false);

    const onConfirm = () => {
        window.location.replace("http://localhost:5173/login")
    };

    const hideAlert = () => {
        // Handle hideAlert action
        setShowErrorAlert(false)
    };

    const onFormSubmit = (data) => {
        setLoader(true);
        const registerBody = { ...data, email: email };
        console.log(registerBody);
        axios({
            url: "http://localhost:8080/employee/register",
            method: "POST",
            data: registerBody,
            headers: {
                "Content-Type": 'application/json'
            }
        }).then((response) => {
            setLoader(false);
            console.log(response);
            if (response.status === 201) {
                // employee created successfully
                setShowSuccessAlert(true);
            }
        }).catch((error) => {
            setLoader(false);
            console.log("Error :", error)
            if (error.response && error.response.status === 409) {
                // Conflict - Employee already exists
                setShowWarningAlert(true);
            } else if(error.response && error.response.status === 500) {
                // Handle other errors
                setShowErrorAlert(true);
            }
        });
    };


    const onErrors = errors => console.error(errors);

    return (
        <>
            <SweetAlert
                success
                title="Registration successful"
                show={showSuccessAlert}
                onConfirm={onConfirm}
            >
                Your registration is completed successfully. Please Login
            </SweetAlert>
            <SweetAlert
                warning
                confirmBtnText="OK"
                confirmBtnBsStyle="success"
                title="Employee Already exists"
                show={showWarningAlert}
                onConfirm={onConfirm}
            >
                Seems like you have already registered. Please login with your credentials
            </SweetAlert>
            <SweetAlert
                danger
                title="Internal Server Error"
                show={showErrorAlert}
                onConfirm={hideAlert}
            >
                We are facing some internal errors. Please try again later
            </SweetAlert>
            {loader && <Loader />}
            <div className="d-flex justify-content-center py-5">
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-body px-5 pt-3 pb-5">
                            <div className="border-bottom py-4">
                                <h5>
                                    Dear {email},
                                </h5>
                                <p className="m-0">
                                    Welcome to CodebergIT ! We are excited to have you join our team. Please take a few moments to complete the registration form below to finalize your account.
                                </p>
                            </div>
                            <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
                                <div className="border-bottom py-3">
                                    <h5>Personal Details</h5>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="formrow-firstname-input" className="form-label">First Name</label><span class="text-danger"> *</span>
                                                <input type="text" name="firstName" className="form-control" id="formrow-firstname-input" placeholder="Enter Your First Name" {...register('firstName')} />
                                                <small className="text-danger">
                                                    {errors?.firstName && errors.firstName.message}
                                                </small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="formrow-middlename-input" className="form-label">Middle Name</label>
                                                <input type="text" name="middleName" className="form-control" id="formrow-middlename-input" placeholder="Enter Your Middle Name" {...register('middleName')} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="formrow-lastname-input" className="form-label">Last Name<span class="text-danger"> *</span></label>
                                                <input type="text" name="lastName" className="form-control" id="formrow-lastname-input" placeholder="Enter Your Last Name" {...register('lastName')} />
                                                <small className="text-danger">
                                                    {errors?.lastName && errors.lastName.message}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label">Date of Birth <span class="text-danger"> *</span></label>
                                                <div className="docs-datepicker">
                                                    <div className="input-group">
                                                        <input type="date" className="form-control docs-date" name="date"
                                                            placeholder="Pick a date" {...register('dateOfBirth')} />
                                                    </div>
                                                    <div className="docs-datepicker-container"></div>
                                                </div>
                                                <small className="text-danger">
                                                    {errors?.dob && errors.dob.message}
                                                </small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div>
                                                <label className="d-block mb-2">Gender <span class="text-danger"> *</span></label>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="male" {...register('gender')} />
                                                    <label className="form-check-label" for="inlineRadio1">Male</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="female" {...register('gender')} />
                                                    <label className="form-check-label" for="inlineRadio2">Female</label>
                                                </div>
                                            </div>
                                            <small className="text-danger">
                                                {errors?.gender && errors.gender.message}
                                            </small>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-bottom py-3">
                                    <h5>Contact Details</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="formrow-email-input" className="form-label">Email<span class="text-danger"> *</span></label>
                                                <input type="email" className="form-control" id="formrow-email-input" placeholder="Enter Your Email ID" value={email} readOnly disabled {...register('email')} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="formrow-number-input" className="form-label">Phone Number<span class="text-danger"> *</span></label>
                                                <input type="text" className="form-control" id="formrow-number-input" placeholder="Enter Your Contact Number" {...register('contactNumber')} />
                                                <small className="text-danger">
                                                    {errors?.phoneNumber && errors.phoneNumber.message}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-bottom py-3">
                                    <h5>Address</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="formrow-addline1-input" className="form-label">Line 1<span class="text-danger"> *</span></label>
                                                <input type="text" className="form-control" id="formrow-addline1-input" placeholder="Address line 1" {...register('addline1')} />
                                                <small className="text-danger">
                                                    {errors?.addline1 && errors.addline1.message}
                                                </small>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="formrow-addline2-input" className="form-label">Line 2</label>
                                                <input type="text" className="form-control" id="formrow-addline2-input" placeholder="Address line 2" {...register('addline2')} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="mb-3">
                                                <label htmlFor="formrow-inputState" className="form-label">State<span class="text-danger"> *</span></label>
                                                <select id="formrow-inputState" className="form-select" {...register('state')}>
                                                    <option value="AP">Andhra Pradesh</option>
                                                    <option value="AR">Arunachal Pradesh</option>
                                                    <option value="AS">Assam</option>
                                                    <option value="BR">Bihar</option>
                                                    <option value="CT">Chhattisgarh</option>
                                                    <option value="GA">Gujarat</option>
                                                    <option value="HR">Haryana</option>
                                                    <option value="HP">Himachal Pradesh</option>
                                                    <option value="JK">Jammu and Kashmir</option>
                                                    <option value="GA">Goa</option>
                                                    <option value="JH">Jharkhand</option>
                                                    <option value="KA">Karnataka</option>
                                                    <option value="KL">Kerala</option>
                                                    <option value="MP">Madhya Pradesh</option>
                                                    <option value="MH">Maharashtra</option>
                                                    <option value="MN">Manipur</option>
                                                    <option value="ML">Meghalaya</option>
                                                    <option value="MZ">Mizoram</option>
                                                    <option value="NL">Nagaland</option>
                                                    <option value="OR">Odisha</option>
                                                    <option value="PB">Punjab</option>
                                                    <option value="RJ">Rajasthan</option>
                                                    <option value="SK">Sikkim</option>
                                                    <option value="TN">Tamil Nadu</option>
                                                    <option value="TG">Telangana</option>
                                                    <option value="TR">Tripura</option>
                                                    <option value="UT">Uttarakhand</option>
                                                    <option value="UP">Uttar Pradesh</option>
                                                    <option value="WB">West Bengal</option>
                                                    <option value="AN">Andaman and Nicobar Islands</option>
                                                    <option value="CH">Chandigarh</option>
                                                    <option value="DN">Dadra and Nagar Haveli</option>
                                                    <option value="DD">Daman and Diu</option>
                                                    <option value="DL">Delhi</option>
                                                    <option value="LD">Lakshadweep</option>
                                                    <option value="PY">Puducherry</option>
                                                </select>
                                                <small className="text-danger">
                                                    {errors?.state && errors.state.message}
                                                </small>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="mb-3">
                                                <label htmlFor="formrow-inputCity" className="form-label">City<span class="text-danger"> *</span></label>
                                                <input type="text" className="form-control" id="formrow-inputCity" placeholder="Enter Your Living City" {...register('city')} />
                                                <small className="text-danger">
                                                    {errors?.city && errors.city.message}
                                                </small>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="mb-3">
                                                <label htmlFor="formrow-inputZip" className="form-label">Zip Code<span class="text-danger"> *</span></label>
                                                <input type="text" className="form-control" id="formrow-inputZip" placeholder="Enter Your Zip Code" {...register('postalCode')} />
                                                <small className="text-danger">
                                                    {errors?.pinCode && errors.pinCode.message}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-bottom py-3">
                                    <h5>Emergency Contact</h5>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="formrow-name-input" className="form-label">Name<span class="text-danger"> *</span></label>
                                                <input type="text" className="form-control" id="formrow-name-input" placeholder="Enter Name" {...register('emerName')} />
                                                <small className="text-danger">
                                                    {errors?.emerName && errors.emerName.message}
                                                </small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="formrow-relation-input" className="form-label">Relation<span class="text-danger"> *</span></label>
                                                <input type="text" className="form-control" id="formrow-relation-input" placeholder="Enter Relation" {...register('emerRelation')} />
                                                <small className="text-danger">
                                                    {errors?.emerRelation && errors.emerRelation.message}
                                                </small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="formrow-contactNo-input" className="form-label">Contact Number<span class="text-danger"> *</span></label>
                                                <input type="text" className="form-control" id="formrow-contactNo-input" placeholder="Enter Contact Number" {...register('emerPhoneNo')} />
                                                <small className="text-danger">
                                                    {errors?.emerNumber && errors.emerNumber.message}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row py-3">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="formrow-password-input" className="form-label">Password<span class="text-danger"> *</span></label>
                                            <input type="password" className="form-control" id="formrow-password-input" placeholder="Enter Password" {...register('password')} />
                                            <small className="text-danger">
                                                {errors?.password && errors.password.message}
                                            </small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="formrow-cpassword-input" className="form-label">Confirm Password<span class="text-danger"> *</span></label>
                                            <input type="password" className="form-control" id="formrow-cpassword-input" placeholder="Confirm Password" {...register('cpassword')} />
                                            <small className="text-danger">
                                                {errors?.cpassword && errors.cpassword.message}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary w-md">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}