import { AdminSidebar } from "./AdminSidebar";

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
                                        <div class="row mb-2">
                                            <div class="col-sm">
                                                <div class="search-box me-2 d-inline-block">
                                                    <div class="position-relative">
                                                        <input type="text" class="form-control" autocomplete="off" id="searchTableList" placeholder="Search..." />
                                                        <i class="bx bx-search-alt search-icon"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-auto">
                                                <div class="text-sm-end">
                                                    <a href="http://localhost:5173/admin/newproject" class="btn btn-success btn-rounded" id="addProject-btn"><i class="mdi mdi-plus me-1"></i> Add New Project</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="">
                                            <div class="table-responsive">
                                                <table class="table project-list-table align-middle table-nowrap dt-responsive nowrap w-100 table-borderless" id="projectList-table">
                                                    <thead class="table-light">
                                                        <tr>
                                                            <th scope="col" style={{ "width": "60px" }}>#</th>
                                                            <th scope="col">Projects</th>
                                                            <th scope="col">Due Date</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col">Team</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                        </div>
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