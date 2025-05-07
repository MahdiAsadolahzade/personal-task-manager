export const convertToStandardDate = (value: string): string | null => {
    if (value) {
        const date = new Date(value);
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        return formattedDate.replace(',', ''); 
    } else return null;
}

export const convertToStandardDateWithTime = (value: string): string | null => {
    if (value) {
        const date = new Date(value);
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        
        const timeOptions: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
        
        return `${formattedDate}, ${formattedTime}`;
    } else return null;
}
