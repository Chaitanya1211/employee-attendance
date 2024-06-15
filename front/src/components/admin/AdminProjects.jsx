import { AdminSidebar } from "./AdminSidebar";
import { ProjectGrid } from "./adminComponents/projectGrid";

export function AdminProjects() {
    return (
        <>
            <div className="d-flex">
                <div className="col-lg-2 position-fixed">
                    <AdminSidebar />
                </div>

                <div className="col-lg-10" style={{ "marginLeft": "auto" }}>
                    <div className="col-lg-12 p-5">
                        <div class="row">
                            <div class="col-12">
                                <div class="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 class="mb-0 font-size-18">Projects List</h4>

                                    <div class="page-title-right">
                                        <ol class="breadcrumb m-0">
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Projects</a></li>
                                            <li class="breadcrumb-item active">Projects List</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row mb-2  justify-content-end">
                                            <div class="col-sm-auto">
                                                <div class="text-sm-end">
                                                    <a href="http://localhost:5173/admin/newproject" class="btn btn-success btn-rounded" id="addProject-btn"><i class="fa-solid fa-plus"></i> Add New Project</a>
                                                </div>
                                            </div>
                                        </div>
                                        <ProjectGrid />
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