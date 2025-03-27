import React, { useState, useEffect } from 'react'
import sendUSSDRequest from './SendUssdRequest'

// USSD Emulator component
const USSDEmulator = ({ navigateTo }) => {
    // States
    const [apiUrl, setApiUrl] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [isConfigured, setIsConfigured] = useState(false);
    const [screenInput, setScreenInput] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalSession, setModalSession] = useState('');
    const [modalInput, setModalInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Generate new session ID
    const generateSessionId = () => {
        // Using a simplified uuid generation since we don't have access to the full uuid library
        return `ussd-${Math.random().toString(36).substring(2, 15)}`;
    };

    // Initialize session ID on component mount
    useEffect(() => {
        setSessionId(generateSessionId());
    }, []);

    // Handle configuration setup
    const handleSetup = () => {
        if (apiUrl && mobileNumber) {
            setIsConfigured(true);
        } else {
            alert('Please enter both API URL and mobile number');
        }
    };

    // Handle numpad click
    const handleNumpadClick = (value) => {
        setScreenInput(prev => prev + value);
    };

    // Handle API request
    const sendRequest = async (input) => {
        setIsLoading(true);

        try {
            // Split input into service code and entered number
            const serviceCodeMatch = input.match(/^(\*\d+)(.*)$/);

            const payload = {
                mobile_number: mobileNumber,
                service_code: serviceCodeMatch ? serviceCodeMatch[1] : input,
                input: serviceCodeMatch ? serviceCodeMatch[2] || '' : '',
                session_id: sessionId
            };

            // Use mock response for demonstration
            // const response = generateMockResponse(input);

            // Uncomment for real API call
            const response = await sendUSSDRequest(apiUrl, payload);
            handleResponse(response);
            setIsLoading(false);

            // Uncomment below for actual API implementation
        } catch (error) {
            setModalMessage('Error connecting to the service. Please try again.');
            setModalSession('END');
            setModalVisible(true);
            setIsLoading(false);
        }
    };

    // Handle API response
    const handleResponse = (response) => {
        setModalMessage(response.message);
        setModalSession(response.session);
        setModalVisible(true);
        setModalInput('');
    };

    // Send button handler
    const handleSend = () => {
        if (screenInput) {
            // If the input starts with *, it's a service code
            if (screenInput.startsWith('*')) {
                sendRequest(screenInput);
            } else {
                // If no service code is active, append to existing input
                sendRequest(screenInput);
            }
        }
    };

    // Modal send button handler
    const handleModalSend = () => {
        if (modalInput) {
            sendRequest(modalInput);
        }
    };

    // Reset function for both cancel and end
    const handleReset = () => {
        setModalVisible(false);
        setScreenInput('');
        setSessionId(generateSessionId());
    };

    // Numpad keys
    const numpadKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="mb-4 w-full max-w-md flex justify-between">
                <button
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                    onClick={() => navigateTo('home')}
                >
                    Back to Home
                </button>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => navigateTo('documentation')}
                >
                    View API Docs
                </button>
            </div>

            {!isConfigured ? (
                <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                    <h2 className="text-xl font-bold mb-4">USSD Emulator Setup</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">API URL</label>
                        <input
                            type="url"
                            className="w-full p-2 border rounded"
                            value={apiUrl}
                            onChange={(e) => setApiUrl(e.target.value)}
                            placeholder="https://your-api-url.com/ussd"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Mobile Number</label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            placeholder="260978921730"
                        />
                    </div>
                    <button
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        onClick={handleSetup}
                    >
                        Start
                    </button>
                </div>
            ) : (
                <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden w-80">
                    {/* Phone frame */}
                    <div className="bg-black text-white p-4 text-center">
                        USSD Emulator
                    </div>

                    {/* Screen display */}
                    <div className="bg-gray-100 p-4 h-24 flex items-center justify-center border-b">
                        <p className="text-lg font-mono break-all">{screenInput}</p>
                    </div>

                    {/* Numpad */}
                    <div className="grid grid-cols-3 gap-1 p-4 bg-gray-200">
                        {numpadKeys.map((key) => (
                            <button
                                key={key}
                                className="bg-white rounded-full h-14 w-14 flex items-center justify-center text-xl font-medium shadow hover:bg-gray-100 mx-auto"
                                onClick={() => handleNumpadClick(key)}
                            >
                                {key}
                            </button>
                        ))}
                    </div>

                    {/* Send button */}
                    <div className="p-4 bg-gray-200 flex justify-center">
                        <button
                            className="bg-green-500 text-white py-2 px-8 rounded-full hover:bg-green-600"
                            onClick={handleSend}
                        >
                            Send
                        </button>
                    </div>

                    {/* Modal overlay */}
                    {modalVisible && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-lg w-72 p-4">
                                <div className="text-sm whitespace-pre-line mb-4">
                                    {modalMessage}
                                </div>

                                {modalSession !== "END" ? (
                                    <>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded mb-2"
                                            value={modalInput}
                                            onChange={(e) => setModalInput(e.target.value)}
                                            placeholder="Enter response"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                                                onClick={handleReset}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
                                                onClick={handleModalSend}
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <button
                                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                                        onClick={handleReset}
                                    >
                                        End
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Loading indicator */}
                    {isLoading && (
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                            <div className="bg-white p-4 rounded-lg">
                                Processing...
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default USSDEmulator;
