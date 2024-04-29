import "../../css/adminLogin.css";
import profileImg from '../../assets/profile-img.png';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
export function AdminLogin() {
    const [email,setEmail] =useState("");
    const [password, setPassword] = useState("");
    const navigateTo = useNavigate();
    function handleSubmit(event){
        event.preventDefault();
        const loginDetails={
            "email" : email,
            "password" : password
        }
        axios({
            url:"http://localhost:8080/admin/login",
                method : "POST",
                data:loginDetails,
                headers:{
                    "Content-Type" : 'application/json'
                }
        }).then((response) =>{
            console.log(response.data);
            if(response.data.message == "success"){
                console.log("Success navigate");
                navigateTo("/admin/home")
            }else{
                // failure
            }
        }).catch((error)=>{
            console.log("Error :" ,error)
        })

    }
    return (
        <>
            <div className="account-pages my-5 pt-sm-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 col-xl-5">
                        <div className="card overflow-hidden">
                            <div className="bg-primary bg-soft">
                                <div className="row">
                                    <div className="col-7">
                                        <div className=" p-4">
                                            <h5 >Welcome Admin !</h5>
                                            <p>Login to continue</p>
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
                                <div className="p-2">
                                    <form className="form-horizontal" onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="username" className="form-label">Username</label>
                                            <input type="text" className="form-control" id="username"
                                                placeholder="Enter username" value={email} onChange={(e)=> {setEmail(e.target.value)}}/>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Password</label>
                                            <div className="input-group auth-pass-inputgroup">
                                                <input type="password" className="form-control" placeholder="Enter password"
                                                    aria-label="Password" aria-describedby="password-addon" value={password} onChange={(e) =>{setPassword(e.target.value)}}/>
                                            </div>
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