export function RegisterHead({ email }) {
    return (
        <>
            <div className="card my-4">
                <div className="card-body p-5">
                        <h5>
                        Dear {email},
                        </h5>
                        Welcome to [Company Name]! We are excited to have you join our team. Please take a few moments to complete the registration form below to finalize your account.
                
                </div>
            </div>
        </>

    );
}