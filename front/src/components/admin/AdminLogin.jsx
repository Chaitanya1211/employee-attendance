import { useState } from 'react';
import profileImg from '../../assets/profile-img.png';
import axios from "axios";
import SweetAlert from 'react-bootstrap-sweetalert';
import loginSchema from '../../helper/loginValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";

export function AdminLogin() {
    const [error, setError] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    });
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const hideAlert = () => {
        // Handle hideAlert action
        setShowErrorAlert(false)
    };
    function onFormSubmit(data) {
        event.preventDefault();
        axios({
            url: "http://localhost:8080/admin/login",
            method: "POST",
            data: data,
            headers: {
                "Content-Type": 'application/json'
            }
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                //login success
                // store token in localstorage
                localStorage.setItem('token', response.data.token);
                // navigate to home page
                window.location.replace("http://localhost:5173/admin/home")
            }
        }).catch((error) => {
            console.log("Error :", error)
            if (error.response.status === 401) {
                // invalid credentials
                setError("Invalid credentials !!")
            } else if (error.response.status === 404) {
                // employee not found
                setError("User not found !!")
            } else if (error.response.status === 500) {
                // internal server error
                setShowErrorAlert(true)
            }
        })
    }

    function onErrors(errors) {
        console.error(errors);
    }
    return (
        <>
            <SweetAlert
                danger
                title="Internal Server Error"
                show={showErrorAlert}
                onConfirm={hideAlert}
            >
                We are facing some internal errors. Please try again later
            </SweetAlert>
            <div className="account-pages my-5 pt-sm-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6 col-xl-5">
                            <div className="card overflow-hidden">
                                <div className="bg-primary bg-soft">
                                    <div className="row">
                                        <div className="col-7">
                                            <div className=" p-4">
                                                <h5 className='text-white'>Welcome Admin !</h5>
                                                <p className='text-white'>Sign in to continue</p>
                                            </div>
                                        </div>
                                        <div className="col-5 align-self-end">
                                            <img src={profileImg} alt=""
                                                className="img-fluid" />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="auth-logo">
                                        <a href="#" className="auth-logo-light">
                                            <div className="avatar-md profile-user-wid mb-4">
                                                <span className="avatar-title rounded-circle bg-light">
                                                </span>
                                            </div>
                                        </a>

                                        <a href="#" className="auth-logo-dark">
                                            <div className="avatar-md profile-user-wid mb-4">
                                                <span className="avatar-title rounded-circle bg-light">
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                    {error && <small className='px-2' style={{ color: 'red' }}>{error}</small>}
                                    <div className="p-2">
                                        <form className="form-horizontal" onSubmit={handleSubmit(onFormSubmit, onErrors)} >
                                            <div className="mb-3">
                                                <label htmlFor="username" className="form-label">Username</label>
                                                <input type="text" className="form-control" id="username"
                                                    placeholder="Enter username" {...register('email')} />
                                                <small className="text-danger">
                                                    {errors?.email && errors.email.message}
                                                </small>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Password</label>
                                                <div className="input-group auth-pass-inputgroup">
                                                    <input type="password" className="form-control" placeholder="Enter password"
                                                        aria-label="Password" aria-describedby="password-addon" {...register('password')} />
                                                </div>
                                                <small className="text-danger">
                                                    {errors?.password && errors.password.message}
                                                </small>
                                            </div>
                                            <div className="mt-3 d-grid">
                                                <button className="btn btn-primary waves-effect waves-light" type="submit">Log
                                                    In</button>
                                            </div>
                                        </form>
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