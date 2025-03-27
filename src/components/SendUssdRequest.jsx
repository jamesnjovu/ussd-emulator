const sendUSSDRequest = async (apiUrl, payload) => {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
        }

        return await response.json();
    } catch (error) {
        console.error('USSD Request Error:', error);
        return {
            message: error instanceof Error
                ? `Error: ${error.message}`
                : 'An unexpected error occurred',
            session: 'END' // End session on error
        };
    }
};

export default sendUSSDRequest;
