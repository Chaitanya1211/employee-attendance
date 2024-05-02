export function Loader() {
    return (
        <>
            <div className="loader-overlay">
                <div class="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </>
    );
}