import { EmployeeSidebar } from "./EmployeeSidebar";
export function EmployeeHome(){
    return(
        <>
        <div className="d-flex">
            <div className="col-lg-2">
                <EmployeeSidebar />
            </div>
        </div>
        </>
    );
}