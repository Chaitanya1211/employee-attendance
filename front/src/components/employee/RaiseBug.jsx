import { EmployeeSidebar } from "./EmployeeSidebar";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import bugSchema from '../../helper/bugValidator';
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import SweetAlert from 'react-bootstrap-sweetalert';
import { BackBtn } from "../../helper/backButton";
export function RaiseBug() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(bugSchema)
    });
    const [employees, setEmployees] = useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [disableBtn, setDisableBtn] = useState(false);
    useEffect(() => {
        axios({
            url: "http://localhost:8080/employee/allEmployees",
            method: "GET",
            headers: {
                "token": token
            }
        }).then((response) => {
            if (response.status === 200) {
                console.log(response)
                setEmployees(response.data.employees)
            }
        }).catch((error) => {
            setEmployees([]);
            if (error.response && error.response.status === 404) {
                console.log(error)
            } else if (error.response && error.response.status === 500) {
                console.log(error)
            }
        })
    }, [])

    const { projectId } = useParams();
    function onFormSubmit(data) {
        setDisableBtn(true);
        const bugBody = { ...data, projectId: projectId }
        axios({
            url: "http://localhost:8080/employee/newBug",
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
                "token": token
            },
            data: bugBody
        }).then((response) => {
            console.log("response", response);
            setShowSuccessAlert(true);
            setDisableBtn(false);
        }).catch((error) => {
            console.log("Error :", error)
            setShowErrorAlert(true);
            setDisableBtn(false);
        })
    }
    function onErrors(errors) {
        console.log(errors)
    }
    const onConfirm = () => {
        window.location.replace(`http://localhost:5173/projects/${projectId}`)
    };
    const hideAlert = () => {
        // Handle hideAlert action
        setShowErrorAlert(false)
    };

    const [files, setFiles] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*', // specify file types if needed
        onDrop: (acceptedFiles) => {
            setValue('images', acceptedFiles);
            setFiles(prevFiles => [
                ...prevFiles,
                ...acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
            ]);
        },
        multiple: true
    });

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    const removeFile = (fileName) => {
        setFiles(files.filter(file => file.name !== fileName));
    };

    const renderFiles = () => files.map(file => (
        <div key={file.name} style={{ display: 'flex', alignItems: 'center', margin: '10px 0', justifyContent: 'space-between' }}>
            {file.type.startsWith('image/') && <img src={file.preview} alt={file.name} width="50px" style={{ marginRight: '10px' }} />}
            <p style={{ margin: 0 }}>{file.name}</p>
            <button className="btn btn-danger" onClick={() => removeFile(file.name)} style={{ marginLeft: '10px' }}>Remove</button>
        </div>
    ));



    return (
        <>
            <SweetAlert
                success
                title="Bug Raised"
                show={showSuccessAlert}
                onConfirm={onConfirm}>
                The bug has been raised successfully
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
                <div className="col-lg-2 position-fixed">
                    <EmployeeSidebar />
                </div>
                <div className="col-lg-10" style={{ "marginLeft": "auto" }}>
                    <div className="col-lg-12 p-5">
                        <div class="row">
                            <div class="col-12">
                                <div class="page-title-box d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <BackBtn />
                                        <h4 class="mb-0 font-size-18">New bug</h4>
                                    </div>

                                    <div class="page-title-right">
                                        <ol class="breadcrumb m-0">
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Project</a></li>
                                            <li class="breadcrumb-item active">New bug</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
                            <div class="row">
                                <div class="col-lg-8">
                                    <div class="card">
                                        <div class="card-body">

                                            <div class="mb-3">
                                                <label for="projectname-input" class="form-label">Bug title</label><span class="text-danger"> *</span>
                                                <input id="projectname-input" name="projectname-input" type="text" class="form-control" placeholder="Enter bug title..." {...register('title')} />
                                                <small className="text-danger">
                                                    {errors?.title && errors.title.message}
                                                </small>
                                            </div>
                                            <div class="mb-3">
                                                <label for="projectdesc-input" class="form-label">Bug Description</label><span class="text-danger"> *</span>
                                                <textarea class="form-control" id="projectdesc-input" rows="3" placeholder="Enter bug description..." {...register('description')}></textarea>
                                                <small className="text-danger">
                                                    {errors?.description && errors.description.message}
                                                </small>
                                            </div>
                                            <div class="mb-3 ">
                                                <label for="task-assign-input" class="form-label">Assign To</label><span class="text-danger"> *</span>
                                                <select class="form-select" name="" id="" {...register('assignedTo')}>
                                                    <option value="">Select Employee</option>
                                                    {/* {employees.map((employee) => (
                                                        <option key={employee.email} value={employee.email}>
                                                            {employee.firstName + " " + employee.lastName}
                                                        </option>
                                                    ))} */}
                                                    {employees.map((employee) => (
                                                        employee.role === "Developer" ? (
                                                            <option key={employee.email} value={employee.email}>
                                                                {employee.firstName + " " + employee.lastName}
                                                            </option>
                                                        ) : null
                                                    ))}

                                                </select>
                                                <small className="text-danger">
                                                    {errors?.assignedTo && errors.assignedTo.message}
                                                </small>
                                            </div>
                                            <label class="form-label">Attached Files</label>
                                            <div {...getRootProps({ className: 'dropzone' })} style={{
                                                border: '2px dashed #cccccc', borderRadius: '5px', padding: '10px', textAlign: 'center'
                                            }}>
                                                <input {...getInputProps()} />
                                                <div className="dz-message text-center">
                                                    <div className="mb-3">
                                                        <i class=" fa-solid fa-cloud-arrow-up"></i>
                                                    </div>
                                                    <h4>Drop files here or click to upload.</h4>
                                                </div>
                                            </div>
                                            <div>
                                                {renderFiles()}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-lg-4">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title mb-3">Publish</h5>

                                            <div class="mb-3">
                                                <label class="form-label" for="project-status-input">QA Status</label><span class="text-danger"> *</span>
                                                <select class="form-select" id="project-status-input" {...register('qa_status')} >
                                                    <option value="OPEN" selected>Open</option>
                                                    <option value="RECHECKING">Rechecking</option>
                                                    <option value="CLOSED">Closed</option>
                                                </select>
                                                <small className="text-danger">
                                                    {errors?.qa_status && errors.qa_status.message}
                                                </small>
                                            </div>

                                            <div class="mb-3">
                                                <label class="form-label" for="project-status-input">Developer Status</label>
                                                <select class="form-select" id="project-status-input" disabled>
                                                    <option selected>INPROGRESS</option>
                                                    <option >Invalid</option>
                                                    <option >Done</option>
                                                </select>

                                            </div>

                                            <div>
                                                <label class="form-label" for="project-visibility-input">Priority</label><span class="text-danger"> *</span>
                                                <select class="form-select" id="project-visibility-input" {...register('priority')}>
                                                    <option value="">Select Priority</option>
                                                    <option value="HIGH">High</option>
                                                    <option value="MEDIUM">Medium</option>
                                                    <option value="LOW">Low</option>
                                                </select>
                                                <small className="text-danger">
                                                    {errors?.priority && errors.priority.message}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary float-end" disabled={disableBtn}>Create</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}