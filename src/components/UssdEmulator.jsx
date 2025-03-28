import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import sendUSSDRequest from './SendUssdRequest';
import { v4 as uuidv4 } from 'uuid';

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
    const [urlError, setUrlError] = useState('');
    const [isExiting, setIsExiting] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const [isKeypadAnimating, setIsKeypadAnimating] = useState(false);
    const [lastPressedKey, setLastPressedKey] = useState(null);

    // Generate new session ID
    const generateSessionId = () => {
        return `ussd-${uuidv4().substring(0, 8)}`;
    };

    // Initialize session ID on component mount
    useEffect(() => {
        setSessionId(generateSessionId());
        // Trigger entrance animation
        setTimeout(() => {
            setFadeIn(true);
        }, 100);
    }, []);

    // Validate URL format
    const validateUrl = (url) => {
        try {
            new URL(url);
            setUrlError('');
            return true;
        } catch (e) {
            setUrlError('Please enter a valid URL (e.g., https://example.com/api)');
            return false;
        }
    };

    // Handle configuration setup
    const handleSetup = () => {
        if (!apiUrl || !mobileNumber) {
            alert('Please enter both API URL and mobile number');
            return;
        }
        
        if (!validateUrl(apiUrl)) {
            return;
        }
        
        setIsConfigured(true);
    };

    // Handle numpad click with animation
    const handleNumpadClick = (value) => {
        setLastPressedKey(value);
        setIsKeypadAnimating(true);
        
        setTimeout(() => {
            setIsKeypadAnimating(false);
            setLastPressedKey(null);
        }, 300);
        
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

    // Handle back navigation with animation
    const handleBackNavigation = () => {
        setIsExiting(true);
        setTimeout(() => {
            navigateTo('home');
        }, 500);
    };

    // Numpad keys
    const numpadKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

    return (
        <>
            {/* SEO Meta Tags */}
            <Helmet>
                <title>USSD Emulator - Test Your USSD Services | Interactive Phone Testing Environment</title>
                <meta name="description" content="Test your USSD services and applications with this realistic phone emulator. Connect to your API and debug your USSD flows without physical devices." />
                <meta name="keywords" content="USSD emulator, USSD testing, phone emulator, mobile testing, API testing, USSD code, USSD development" />
                <link rel="canonical" href="https://jamesnjovu.github.io/ussd-emulator/emulator" />
                <script type="application/ld+json">
                {`
                    {
                      "@context": "https://schema.org",
                      "@type": "SoftwareApplication",
                      "name": "USSD Emulator Tool",
                      "applicationCategory": "DeveloperTool",
                      "operatingSystem": "Web",
                      "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                      }
                    }
                `}
                </script>
            </Helmet>

            <div className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 transition-opacity duration-500 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'} ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
                <div className="mb-6 w-full max-w-md flex justify-between">
                    <button
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all duration-300 transform hover:scale-105"
                        onClick={handleBackNavigation}
                        aria-label="Back to Home"
                    >
                        Back to Home
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
                        onClick={() => navigateTo('documentation')}
                        aria-label="View API Documentation"
                    >
                        View API Docs
                    </button>
                </div>

                {!isConfigured ? (
                    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:shadow-3xl">
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">USSD Emulator Setup</h2>
                        <div className="mb-5">
                            <label htmlFor="api-url" className="block text-sm font-medium mb-2 text-gray-700">API URL</label>
                            <input
                                id="api-url"
                                type="url"
                                className={`w-full p-3 border ${urlError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300`}
                                value={apiUrl}
                                onChange={(e) => {
                                    setApiUrl(e.target.value);
                                    if (e.target.value) validateUrl(e.target.value);
                                }}
                                onBlur={() => {
                                    if (apiUrl) validateUrl(apiUrl);
                                }}
                                placeholder="https://your-api-url.com/ussd"
                                aria-describedby="url-error"
                            />
                            {urlError && <p id="url-error" className="mt-1 text-sm text-red-500">{urlError}</p>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="mobile-number" className="block text-sm font-medium mb-2 text-gray-700">Mobile Number</label>
                            <input
                                id="mobile-number"
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                placeholder="260978921730"
                            />
                        </div>
                        <button
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 font-medium text-lg"
                            onClick={handleSetup}
                            aria-label="Start Emulator"
                        >
                            Start Emulator
                        </button>
                    </div>
                ) : (
                    <div className="transform transition-all duration-500 scale-100 hover:scale-105">
                        {/* Phone frame */}
                        <div className="relative bg-gray-900 rounded-[50px] shadow-2xl overflow-hidden w-80 border-8 border-gray-800" aria-label="USSD Phone Emulator">
                            {/* Status bar */}
                            <div className="bg-black text-white p-2 flex justify-between items-center text-xs">
                                <div>9:41 AM</div>
                                <div className="absolute top-0 left-0 right-0 mx-auto w-40 h-6 bg-black rounded-b-2xl flex justify-center items-center">
                                    <div className="w-16 h-4 bg-black rounded-lg relative">
                                        <div className="absolute w-3 h-3 rounded-full bg-gray-700 right-2 top-0.5"></div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <span>4G</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                        <path fillRule="evenodd" d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.06 0A13.19 13.19 0 0 0 12 6.75c-3.536 0-6.887 1.378-9.405 3.984a.75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                        <path fillRule="evenodd" d="M5.055 11.826A9.001 9.001 0 0 1 12 9.75c2.399 0 4.665.937 6.371 2.643a.75.75 0 0 1 0 1.06l-.53.53a.75.75 0 0 1-1.06 0A6.752 6.752 0 0 0 12 11.25a6.75 6.75 0 0 0-4.78 1.978.75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06l.425.413-.425-.414Z" clipRule="evenodd" />
                                        <path fillRule="evenodd" d="M8.75 15.75a3.75 3.75 0 0 1 6.5-2.546.75.75 0 0 1 0 1.061l-3.5 3.5a.75.75 0 0 1-1.06 0l-1.5-1.5a.75.75 0 0 1 0-1.06l.53-.53a.75.75 0 0 1 1.06 0l.97.97 2.97-2.97a.75.75 0 0 1 .078-.069A2.25 2.25 0 0 0 12 13.5a2.25 2.25 0 0 0-2.25 2.25.75.75 0 0 1-1.5 0Z" clipRule="evenodd" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                        <path fillRule="evenodd" d="M3.75 6.75a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-.037c.856-.174 1.5-.93 1.5-1.838v-2.25c0-.907-.644-1.664-1.5-1.837V9.75a3 3 0 0 0-3-3h-15Zm15 1.5a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5v-6a1.5 1.5 0 0 1 1.5-1.5h15ZM4.5 9.75a.75.75 0 0 0-.75.75V15c0 .414.336.75.75.75H18a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75H4.5Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            {/* App header */}
                            <div className="bg-blue-600 text-white p-4 text-center font-medium shadow-md">
                                <div className="text-lg">USSD Emulator</div>
                                <div className="text-xs opacity-80">{mobileNumber}</div>
                            </div>

                            {/* Screen display */}
                            <div className="bg-gray-50 p-4 h-28 flex items-center justify-center border-b relative transition-all duration-300" aria-live="polite">
                                <p className="text-lg font-mono break-all transition-all duration-300">{screenInput}</p>
                                {screenInput && (
                                    <button 
                                        onClick={handleClear}
                                        className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 hover:bg-gray-300"
                                        aria-label="Clear input"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>

                            {/* Session history display */}
                            {sessionHistory.length > 0 && (
                                <div className="bg-white px-4 py-2 border-b text-xs text-gray-500 animate-fadeIn">
                                    <p className="font-semibold">Session: {sessionId.substring(0, 8)}...</p>
                                    <p className="truncate">History: {sessionHistory.join(' → ')}</p>
                                </div>
                            )}

                            {/* Numpad */}
                            <div className="grid grid-cols-3 gap-2 p-4 bg-gray-100" role="group" aria-label="Keypad">
                                {numpadKeys.map((key) => (
                                    <button
                                        key={key}
                                        className={`bg-white rounded-full h-12 w-12 flex items-center justify-center text-lg font-medium shadow hover:bg-gray-100 mx-auto transition-all duration-300 transform ${isKeypadAnimating && lastPressedKey === key ? 'scale-90 bg-blue-100' : 'scale-100'}`}
                                        onClick={() => handleNumpadClick(key)}
                                        aria-label={`Keypad button ${key}`}
                                    >
                                        {key}
                                    </button>
                                ))}
                            </div>

                            {/* Send button */}
                            <div className="p-4 bg-gray-100 flex justify-center">
                                <button
                                    className="bg-green-500 text-white py-2 px-10 rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-medium shadow-md"
                                    onClick={handleSend}
                                    disabled={!screenInput}
                                    aria-label="Send USSD code"
                                >
                                    Send
                                </button>
                            </div>

                            {/* Home button / bottom bar */}
                            <div className="bg-black h-1 w-32 rounded-full mx-auto my-4"></div>
                        </div>

                        {/* Modal overlay with animation */}
                        {modalVisible && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10 animate-fadeIn" role="dialog" aria-modal="true" aria-labelledby="ussd-response">
                                <div className="bg-white rounded-lg w-72 p-4 shadow-xl transform animate-scaleIn">
                                    <div id="ussd-response" className="text-sm whitespace-pre-line mb-4 max-h-56 overflow-y-auto">
                                        {modalMessage}
                                    </div>

                                    {modalSession === "CON" ? (
                                        <>
                                            <input
                                                type="text"
                                                className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                                                value={modalInput}
                                                onChange={(e) => setModalInput(e.target.value)}
                                                placeholder="Enter response"
                                                autoFocus
                                                aria-label="USSD response input"
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
                                                    onClick={handleReset}
                                                    aria-label="Cancel USSD session"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                                    onClick={handleModalSend}
                                                    disabled={!modalInput}
                                                    aria-label="Send response"
                                                >
                                                    Send
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <button
                                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 font-medium"
                                            onClick={handleReset}
                                            aria-label="Close USSD session"
                                        >
                                            Close
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Loading indicator with animation */}
                        {isLoading && (
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-20 animate-fadeIn" aria-live="polite" aria-busy="true">
                                <div className="bg-white p-5 rounded-lg shadow-lg flex items-center space-x-4 animate-pulse">
                                    <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span className="font-medium">Processing...</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default USSDEmulator;
