import { useState } from "react";
import { TimeCard } from "../../helper/timeCard";
import { EmployeeSidebar } from "./EmployeeSidebar";
import SweetAlert from 'react-bootstrap-sweetalert';
export function EmployeeHome() {
    const [showMarkModal, setShowMarkModal] = useState(false);
    const onConfirm = () => {
        
        setShowMarkModal(false)
    };


    const showModal= () => {
        setShowMarkModal(true);
    }
    return (
        <>
            <SweetAlert 
            title={"Hello"} 
            onConfirm={onConfirm}
            show={showMarkModal}>
                Hello
            </SweetAlert>

            <div className="d-flex">
                <div className="col-lg-2 position-fixed">
                    <EmployeeSidebar />
                </div>

                <div className="col-lg-10" style={{ "marginLeft": "auto" }}>
                    <div className="col-lg-12 p-5">
                        <div className="d-flex justify-content-between">
                            {/* greeting column */}
                            <div className="col-lg-4">
                                <h4>Good Afternoon Name !!!</h4>
                            </div>
                            {/* time and mark column */}
                            <div className="col-lg-3">
                                <TimeCard />
                                <button onClick={showModal} className="btn btn-primary float-end mt-2">Mark Attendance</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}