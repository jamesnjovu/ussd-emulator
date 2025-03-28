/**
 * USSD Request Handler
 *
 * Handles the communication between the USSD emulator and the backend API.
 * Manages response formatting, error handling, and session state.
 */

const sendUSSDRequest = async (apiUrl, payload) => {
    // Flag to track if we need to use CORS proxy after a failed attempt
    let useCorsProxy = false;
    let corsProxyUrl = null;
    let attempts = 0;
    const maxAttempts = 2; // Try original URL, then with CORS proxy

    while (attempts < maxAttempts) {
        try {
            attempts++;

            // If this is the second attempt, use a CORS proxy
            if (useCorsProxy && !apiUrl.includes('corsproxy.io')) {
                corsProxyUrl = `https://corsproxy.io/?url=${apiUrl}`;
            }

            const urlToUse = corsProxyUrl || apiUrl;

            // Add request timeout after 15 seconds
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000);

            const response = await fetch(urlToUse, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
                body: JSON.stringify(payload),
                signal: controller.signal,
                credentials: 'same-origin',
            });

            // Clear the timeout
            clearTimeout(timeoutId);

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

            // If this is the first attempt and it failed, try with CORS proxy
            if (attempts === 1) {
                useCorsProxy = true;
                continue;
            }

            // Handle specific error types
            if (error.name === 'AbortError') {
                return {
                    message: 'Request timed out. Please check your API URL and try again.',
                    session: 'END' // End session on timeout
                };
            }

            if (error.name === 'TypeError' && error.message.includes('NetworkError')) {
                return {
                    message: 'CORS Error: The API server is not allowing requests from this domain. Try one of these solutions:\n\n1. Enable CORS on your API server\n2. Use a CORS proxy in your API URL (e.g., https://corsproxy.io/?your-api-url)\n3. Run the emulator locally',
                    session: 'END'
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
    }

    // If we've tried all options and still failed
    return {
        message: 'Failed to connect to the API after multiple attempts. Please check the API URL and ensure the server is running and properly configured for CORS.',
        session: 'END'
    };
};

export default sendUSSDRequest;
