
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
    "session": "string"  // Session state: "CON" for continuing, any other value to end
  }`}
                        </div>

                        <div className="mt-4">
                            <h3 className="font-semibold">Notes:</h3>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>The <code>message</code> field supports line breaks using "\n" characters</li>
                                <li>When <code>session</code> is "CON", the emulator will show an input field for the user's response</li>
                                <li>When <code>session</code> is any value other than "CON", the emulator will display only an "End" button</li>
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
    "session": "CON"
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

export default DocumentationPage;
