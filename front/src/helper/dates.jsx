export function toISTLocaleString(date) {
        if (!date) return 'N/A';
        const options = {
            timeZone: 'Asia/Kolkata',
            day: 'numeric',
            month: 'short', // 'short' will give the abbreviated month name
            year: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true // use 12-hour format
        };
        return new Date(date).toLocaleString('en-IN', options);
    }