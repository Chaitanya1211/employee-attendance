import { useState } from 'react';
import profileImg from '../../assets/profile-img.png';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
export function EmployeeLogin(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showErrorAlert , setShowErrorAlert] = useState(false);
    const [token, setToken] = useState('');
    const navigateTo = useNavigate();
    const hideAlert = () => {
        // Handle hideAlert action
        setShowErrorAlert(false)
    };
    function handleSubmit(event){
        event.preventDefault();
        const loginDetails={
            "email" : email,
            "password" : password
        }
        console.log(loginDetails)
        axios({
            url:"http://localhost:8080/employee/login",
            method : "POST",
            data:loginDetails,
            headers:{
                "Content-Type" : 'application/json'
            }
        }).then((response)=>{
            console.log(response);
            if(response.status === 200){
                //login success
                // store token in localstorage
                localStorage.setItem('token',response.data.token);
                // navigate to home page
                window.location.replace("http://localhost:5173/home")
            }
        }).catch((error)=>{
            console.log("Error :", error)
            if(error.response.status === 401){
                // invalid credentials
                setError("Invalid credentials !!")
            }else if(error.response.status === 404){
                // employee not found
                setError("User not found !!")
            }else if(error.response.status === 500){
                // internal server error
                setShowErrorAlert(true)
            }
        })
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
                                            <h5 >Welcome Back !</h5>
                                            <p>Sign in to continue</p>
                                        </div>
                                    </div>
                                    <div className="col-5 align-self-end">
                                        <img src={profileImg} alt=""
                                            className="img-fluid"/>
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
                                    <form className="form-horizontal" onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="username" className="form-label">Username</label>
                                            <input type="text" className="form-control" id="username"
                                                placeholder="Enter username" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Password</label>
                                            <div className="input-group auth-pass-inputgroup">
                                                <input type="password" className="form-control" placeholder="Enter password"
                                                    aria-label="Password" value={password} aria-describedby="password-addon" onChange={(e) => {setPassword(e.target.value)}}/>
                                            </div>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="remember-check"/>
                                            <label className="form-check-label" htmlFor="remember-check"/>
                                                Remember me
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