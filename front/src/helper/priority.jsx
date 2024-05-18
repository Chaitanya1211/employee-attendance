export function Priority(priority){
    if (!priority) return "N/A";

        switch (priority) {
            case "HIGH":
                return <span class="badge bg-danger">HIGH</span>
            case "MEDIUM":
                return <span class="badge bg-warning">MEDIUM</span>
            case "LOW":
                return <span class="badge bg-success">LOW</span>
        }
}

export function Status(status){
    if (!status) return <span class="badge bg-info">N/A</span>;

        switch (status) {
            case "OPEN":
                return <span class="badge bg-danger">OPEN</span>
            case "RECHECKING":
                return <span class="badge bg-info">RECHECKING</span>
            case "CLOSED":
                return <span class="badge bg-dark">CLOSED</span>
            case "INVALID":
                return <span class="badge bg-primary">INVALID</span>
            case "INPROGRESS":
                return <span class="badge bg-warning">INPROGRESS</span>
            case "DONE":
                return <span class="badge bg-succeess">DONE</span>
        }
}