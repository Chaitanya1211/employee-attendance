import { AdminSidebar } from "./AdminSidebar";
import '../../assets/css/app.min.css';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/icons.min.css';
import '../../assets/js/plugin';
import { ProjectGrid } from "./adminComponents/projectGrid";

export function AdminHome() {
    return (
        <>
            <div className="d-flex">
                <div className="col-lg-2 position-fixed">
                    <AdminSidebar />
                </div>
                <div className="col-lg-10" style={{ "margin-left": "auto" }}>
                    <div className="col-lg-12 p-5">
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title mb-4">All Projects</h4>
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