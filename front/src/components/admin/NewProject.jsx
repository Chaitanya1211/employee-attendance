import { AdminSidebar } from "./AdminSidebar";
import '../../assets/js/dropzone-min';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import projectSchema from "../../helper/projectValidator";
import { useState, useRef } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';
import noProject from '../../assets/no-project.png';
import axios from "axios";
import { BackBtn } from "../../helper/backButton";
export function NewProject() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(projectSchema)
    });
    const [projectSuccess, setProjectSuccess] = useState(false);
    const [createDisable, setcreateDisable] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [defaultProjectImg, setDefaultProjectImg] = useState(noProject);
    const hideAlert = () => {
        setShowErrorAlert(false);
    }

    const onSubmitForm = (data) => {
        console.log("Data :", data);
        const formData = new FormData();
        formData.append('projectName', data.projectName);
        formData.append('projectDesc', data.projectDesc);
        if (data.projectImage != null) {
            formData.append('projectImage', data.projectImage);
        }
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        setcreateDisable(true);
        axios({
            url: "http://localhost:8080/admin/createProject",
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
                "token": token
            },
            data: formData
        }).then((response) => {
            console.log("Response :", response);
            if (response.status === 201) {
                setProjectSuccess(true);
                setcreateDisable(false);
            }
        }).catch((error) => {
            console.error("Error", error);
            if (error.response && error.response.status === 500) {
                setShowErrorAlert(true);
            }
        })
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setDefaultProjectImg(reader.result);
            };
            reader.readAsDataURL(file);
            setValue('projectImage', file);
          }
    }
    const onError = (errors) => {
        console.log(errors);
    }

    const onConfirm = () =>{
        window.location.replace("http://localhost:5173/admin/projects")
    }
    return (
        <>
            <SweetAlert
                success
                title="Project Created"
                show={projectSuccess}
                onConfirm={onConfirm}
            >
                Project Created Successfully
            </SweetAlert>

            <SweetAlert
                danger
                title="Internal Server Error"
                show={showErrorAlert}
                onConfirm={hideAlert}
            >
                We are facing some internal errors. Please try again later
            </SweetAlert>

            <div className="d-flex">
                <div className="col-lg-2">
                    <AdminSidebar />
                </div>
                <div className="col-lg-10" style={{ "marginLeft": "auto" }}>
                    <div className="col-lg-12 p-5">
                        <div class="row">
                            <div class="col-12">
                                <div class="page-title-box d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                        <BackBtn />
                                        <h4 class="mb-0 font-size-18">New Project</h4>
                                    </div>

                                    <div class="page-title-right">
                                        <ol class="breadcrumb m-0">
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Projects</a></li>
                                            <li class="breadcrumb-item active">New Project</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmitForm, onError)}>
                            <div class="card">
                                <div class="card-body">
                                    <input type="hidden" class="form-control" id="formAction" name="formAction" value="add" />
                                    <input type="hidden" class="form-control" id="project-id-input" />
                                    <div class="mb-3">
                                        <label for="projectname-input" class="form-label">Project Name</label>
                                        <span class="text-danger"> *</span>
                                        <input id="projectname-input" name="projectname-input" type="text" class="form-control" placeholder="Enter project name..."{...register('projectName')} />
                                        <small className="text-danger">
                                            {errors?.projectName && errors.projectName.message}
                                        </small>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Project Image</label>
                                        <div class="text-center">
                                            <div class="position-relative d-inline-block">
                                                <div class="position-absolute bottom-0 end-0">
                                                    <label for="project-image-input" class="mb-0" data-bs-toggle="tooltip" data-bs-placement="right" title="Select Image">
                                                        <div class="avatar-xs">
                                                            <div class="avatar-title bg-light border rounded-circle text-muted cursor-pointer shadow font-size-16">
                                                                <i class="fa-solid fa-pen"></i>
                                                            </div>
                                                        </div>
                                                    </label>
                                                    <input class="form-control d-none" value="" id="project-image-input" type="file" accept="image/png, image/gif, image/jpeg" onChange={handleFileChange} />
                                                </div>
                                                <div class="avatar-lg">
                                                    <div class="avatar-title bg-light rounded-circle">
                                                        <img src={defaultProjectImg} id="projectlogo-img" class="avatar-md h-auto rounded-circle" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="projectdesc-input" class="form-label">Project Description</label>
                                        <textarea class="form-control" id="projectdesc-input" rows="3" placeholder="Enter project description..." {...register('projectDesc')}></textarea>
                                        <div class="invalid-feedback">Please enter a project description.</div>
                                    </div>
                                    <div className="col-lg-2 float-end text-end mt-3">
                                        <button type="submit" class="btn btn-primary" disabled={createDisable}>Create Project</button>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}