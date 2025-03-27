import React, { useState, useEffect } from 'react'
import sendUSSDRequest from './SendUssdRequest'

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
    const [sessionHistory, setSessionHistory] = useState([]);

    // Generate new session ID
    const generateSessionId = () => {
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

    // Clear screen input
    const handleClear = () => {
        setScreenInput('');
    };

    // Handle API request
    const sendRequest = async (input) => {
        setIsLoading(true);

        try {
            // Format payload for the API
            const payload = {
                mobile_number: mobileNumber,
                input: input,
                session_id: sessionId
            };

            // Keep track of the input for session history
            if (sessionHistory.length === 0 || input.startsWith('*')) {
                // Start a new session if first request or when a new USSD code is entered
                setSessionHistory([input]);
            } else {
                // Add to existing session history
                setSessionHistory([...sessionHistory, input]);
            }

            const response = await sendUSSDRequest(apiUrl, payload);
            handleResponse(response);
        } catch (error) {
            setModalMessage('Error connecting to the service. Please try again.');
            setModalSession('END');
            setModalVisible(true);
        } finally {
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
            sendRequest(screenInput);
            setScreenInput('');
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
        setSessionHistory([]);
        setSessionId(generateSessionId());
    };

    // Numpad keys
    const numpadKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="mb-4 w-full max-w-md flex justify-between">
                <button
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
                    onClick={() => navigateTo('home')}
                >
                    Back to Home
                </button>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    onClick={() => navigateTo('documentation')}
                >
                    View API Docs
                </button>
            </div>

            {!isConfigured ? (
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-xl font-bold mb-4 text-center">USSD Emulator Setup</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">API URL</label>
                        <input
                            type="url"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            value={apiUrl}
                            onChange={(e) => setApiUrl(e.target.value)}
                            placeholder="https://your-api-url.com/ussd"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Mobile Number</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            placeholder="260978921730"
                        />
                    </div>
                    <button
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                        onClick={handleSetup}
                    >
                        Start
                    </button>
                </div>
            ) : (
                <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden w-80">
                    {/* Phone frame */}
                    <div className="bg-gray-800 text-white p-4 text-center font-medium">
                        USSD Emulator
                    </div>

                    {/* Screen display */}
                    <div className="bg-gray-100 p-4 h-24 flex items-center justify-center border-b relative">
                        <p className="text-lg font-mono break-all">{screenInput}</p>
                        {screenInput && (
                            <button 
                                onClick={handleClear}
                                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center"
                            >
                                ×
                            </button>
                        )}
                    </div>

                    {/* Session history display */}
                    {sessionHistory.length > 0 && (
                        <div className="bg-gray-50 px-4 py-2 border-b text-xs text-gray-500">
                            <p className="font-semibold">Session ID: {sessionId.substring(0, 8)}...</p>
                            <p>History: {sessionHistory.join(' → ')}</p>
                        </div>
                    )}

                    {/* Numpad */}
                    <div className="grid grid-cols-3 gap-1 p-4 bg-gray-200">
                        {numpadKeys.map((key) => (
                            <button
                                key={key}
                                className="bg-white rounded-full h-14 w-14 flex items-center justify-center text-xl font-medium shadow hover:bg-gray-100 mx-auto transition"
                                onClick={() => handleNumpadClick(key)}
                            >
                                {key}
                            </button>
                        ))}
                    </div>

                    {/* Send button */}
                    <div className="p-4 bg-gray-200 flex justify-center">
                        <button
                            className="bg-green-500 text-white py-2 px-8 rounded-full hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleSend}
                            disabled={!screenInput}
                        >
                            Send
                        </button>
                    </div>

                    {/* Modal overlay */}
                    {modalVisible && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
                            <div className="bg-white rounded-lg w-72 p-4 shadow-lg">
                                <div className="text-sm whitespace-pre-line mb-4 max-h-48 overflow-y-auto">
                                    {modalMessage}
                                </div>

                                {modalSession === "CON" ? (
                                    <>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded mb-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                            value={modalInput}
                                            onChange={(e) => setModalInput(e.target.value)}
                                            placeholder="Enter response"
                                            autoFocus
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                                                onClick={handleReset}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                                onClick={handleModalSend}
                                                disabled={!modalInput}
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <button
                                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
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
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-20">
                            <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3">
                                <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Processing...</span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default USSDEmulator;