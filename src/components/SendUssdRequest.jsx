/**
 * USSD Request Handler
 * 
 * Handles the communication between the USSD emulator and the backend API.
 * Manages response formatting, error handling, and session state.
 */

const sendUSSDRequest = async (apiUrl, payload) => {
    try {
        console.log('Sending USSD request to:', apiUrl);
        console.log('Payload:', payload);

        // Add request timeout after 15 seconds
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
            },
            body: JSON.stringify(payload),
            signal: controller.signal,
        });

        // Clear the timeout
        clearTimeout(timeoutId);

        // Log response headers for debugging
        console.log('Response status:', response.status);
        console.log('Response headers:', [...response.headers.entries()]);

        // Check for Freeflow header (case insensitive)
        let freeflowHeader = null;
        for (const [key, value] of response.headers.entries()) {
            if (key.toLowerCase() === 'freeflow') {
                freeflowHeader = value;
                break;
            }
        }

        // If not found, check for Content-Type header containing freeflow information (some APIs do this)
        if (!freeflowHeader) {
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('freeflow=')) {
                freeflowHeader = contentType.split('freeflow=')[1].split(';')[0];
            }
        }

        // Parse response text
        const responseText = await response.text();
        console.log('Response body:', responseText);

        // If response is not OK, handle error but continue flow if possible
        if (!response.ok) {
            console.warn(`HTTP error! status: ${response.status}`);
            return {
                message: `Error: Server returned ${response.status} ${response.statusText}\n\n${responseText || 'No response details'}`,
                session: freeflowHeader === 'FC' ? 'CON' : 'END'
            };
        }

        // Return formatted response object based on Freeflow header
        return {
            message: responseText || 'No response from server',
            // If Freeflow is FC (continue), set session to CON, otherwise END
            session: freeflowHeader === 'FC' ? 'CON' : 'END'
        };
    } catch (error) {
        console.error('USSD Request Error:', error);

        // Handle specific error types
        if (error.name === 'AbortError') {
            return {
                message: 'Request timed out. Please check your API URL and try again.',
                session: 'END' // End session on timeout
            };
        }

        if (error.message && error.message.includes('Failed to fetch')) {
            return {
                message: 'Network error: Could not connect to the API. Please check your URL and ensure CORS is enabled on your server.',
                session: 'END'
            };
        }

        return {
            message: error instanceof Error
                ? `Error: ${error.message}`
                : 'An unexpected error occurred while connecting to the service',
            session: 'END' // End session on error
        };
    }
};

export default sendUSSDRequest;
