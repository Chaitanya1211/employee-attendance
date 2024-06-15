import { useEffect, useState } from "react";

function getDate() {
    const date = new Date();

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
  }

export function TimeCard() {
    const [dateTime, setDateTime] = useState(getDate());
    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(getDate());
        }, 10000);
    
        return () => clearInterval(interval);
      }, []);
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex">
                        <div className="col-lg-10">
                            <small>Current time</small>
                            <h5 className="mb-0">{dateTime}</h5>
                        </div>
                        <div className="col-lg-2 d-flex justify-content-center align-items-center clock">
                            <i class="fa-regular fa-clock"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}