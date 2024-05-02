import { AdminSidebar } from "./AdminSidebar";

export function AdminHome() {
    return (
        <>
            <div className="d-flex">
                <div className="col-lg-2 position-fixed">
                    <AdminSidebar />
                </div>
                <div className="col-lg-10" style={{ "margin-left": "auto" }}>
                    <div className="col-lg-12 p-5">
                        
                    </div>
                </div>
            </div>
        </>
    );

} 