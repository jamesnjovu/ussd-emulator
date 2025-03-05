import React, { useState, useEffect } from 'react'

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
      session: '' // End session on error
    };
  }
};

// Mock response generator
const generateMockResponse = (input) => {
  // Initial menu
  if (input === '*123#') {
    return {
      message: "Welcome to Mobile Banking\n1. Check Balance\n2. Transfer Money\n3. Buy Airtime\n4. Bill Payment\n5. Exit",
      session: "C"
    };
  }

  // Balance inquiry
  if (input === '1') {
    return {
      message: "Your current balance is: $1,234.56\nAvailable funds: $1,200.00\n0. Back to Main Menu\n#. Exit",
      session: "C"
    };
  }

  // Transfer money flow
  if (input === '2') {
    return {
      message: "Transfer Money\nEnter recipient's mobile number:",
      session: "C"
    };
  }

  // Exit
  if (input.includes('#')) {
    return {
      message: "Thank you for using Mobile Banking. Goodbye!",
      session: "" // Ends session
    };
  }

  // Default fallback
  return {
    message: "Invalid selection. Please try again.\n0. Back to Main Menu\n#. Exit",
    session: "C"
  };
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Handle page navigation
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
      {currentPage === 'emulator' && <USSDEmulator navigateTo={navigateTo} />}
      {currentPage === 'documentation' && <DocumentationPage navigateTo={navigateTo} />}
    </div>
  );
}

// Home page component
const HomePage = ({ navigateTo }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <h1 className="text-3xl font-bold mb-8">USSD Emulator</h1>
      <div className="w-full max-w-md space-y-4">
        <button
          onClick={() => navigateTo('emulator')}
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 font-medium text-lg shadow-md"
        >
          Launch Emulator
        </button>
        <button
          onClick={() => navigateTo('documentation')}
          className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 font-medium text-lg shadow-md"
        >
          API Documentation
        </button>
      </div>
    </div>
  );
};

// Documentation page component
const DocumentationPage = ({ navigateTo }) => {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">USSD Emulator API Documentation</h1>
          <button
            onClick={() => navigateTo('home')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Home
          </button>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">Overview</h2>
            <p>
              The USSD Emulator interacts with your API to simulate USSD service interactions. This document outlines the expected request and response formats.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Request Format</h2>
            <p className="mb-2">The emulator sends POST requests to the API URL you provide during setup with the following JSON payload:</p>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              {`{
                "mobile_number": "string", // The mobile number entered during setup
                "input": "string",         // The USSD code or response entered by the user
                "session_id": "string"     // A unique session identifier for the current session
              }`}
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Notes:</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>The <code>session_id</code> remains consistent throughout a single USSD session</li>
                <li>A new <code>session_id</code> is generated when a session ends or is canceled</li>
                <li>The <code>input</code> field contains the USSD code (e.g., "*123#") for the initial request</li>
                <li>For subsequent requests, <code>input</code> contains the user's response to the previous prompt</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Response Format</h2>
            <p className="mb-2">Your API should respond with the following JSON structure:</p>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              {`{
  "message": "string", // The text to display to the user
  "session": "string"  // Session state: "C" for continuing, any other value to end
}`}
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Notes:</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>The <code>message</code> field supports line breaks using "\n" characters</li>
                <li>When <code>session</code> is "C", the emulator will show an input field for the user's response</li>
                <li>When <code>session</code> is any value other than "C", the emulator will display only an "End" button</li>
                <li>To create menus, include numbered options in the <code>message</code> field (e.g., "1. Check Balance\n2. Transfer Money")</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Example Flow</h2>

            <div className="border-l-4 border-blue-500 pl-4 mb-4">
              <p className="font-semibold">Initial Request (User dials *123#):</p>
              <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm mt-2 overflow-x-auto">
                {`POST /your-api-endpoint
{
  "mobile_number": "1234567890",
  "input": "*123#",
  "session_id": "ussd-abc123"
}`}
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4 mb-4">
              <p className="font-semibold">Response (Menu options):</p>
              <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm mt-2 overflow-x-auto">
                {`{
  "message": "Welcome to USSD Service\\n1. Check Balance\\n2. Transfer Money\\n3. Buy Airtime",
  "session": "C"
}`}
              </div>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 mb-4">
              <p className="font-semibold">Next Request (User selects option 1):</p>
              <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm mt-2 overflow-x-auto">
                {`POST /your-api-endpoint
{
  "mobile_number": "1234567890",
  "input": "1",
  "session_id": "ussd-abc123"
}`}
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-semibold">Final Response (Session ending):</p>
              <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm mt-2 overflow-x-auto">
                {`{
  "message": "Your current balance is $100.00",
  "session": ""
}`}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Error Handling</h2>
            <p>If your API encounters an error, you can return an error message in the following format:</p>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-2 overflow-x-auto">
              {`{
  "message": "Error: Invalid selection. Please try again.",
  "session": "C"  // C to allow retry, or any other value to end the session
}`}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};


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
      const payload = {
        mobile_number: mobileNumber,
        input: input,
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
      setModalSession('');
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
      sendRequest(screenInput);
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

                {modalSession === "C" ? (
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

export default App
