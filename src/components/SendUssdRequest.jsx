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

        // Get the Freeflow header value
        const freeflowHeader = response.headers.get('Freeflow');
        
        // Parse response text
        const responseText = await response.text();
        
        // Return formatted response object based on Freeflow header
        return {
            message: responseText,
            // If Freeflow is FC (continue), set session to CON, otherwise END
            session: freeflowHeader === 'FC' ? 'CON' : 'END'
        };
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