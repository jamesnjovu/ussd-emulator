import React from 'react';

const DocumentationPage = ({ navigateTo }) => {
    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">USSD Emulator API Documentation</h1>
                    <button
                        onClick={() => navigateTo('home')}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Back to Home
                    </button>
                </div>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-xl font-semibold mb-3 border-b pb-2">Overview</h2>
                        <p>
                            The USSD Emulator interacts with your API to simulate USSD service interactions. This document outlines the expected request and response formats.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 border-b pb-2">Request Format</h2>
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
                                <li>The <code className="bg-gray-100 px-1 rounded">session_id</code> remains consistent throughout a single USSD session</li>
                                <li>A new <code className="bg-gray-100 px-1 rounded">session_id</code> is generated when a session ends or is canceled</li>
                                <li>The <code className="bg-gray-100 px-1 rounded">input</code> field contains the USSD code (e.g., "*123#") for the initial request</li>
                                <li>For subsequent requests, <code className="bg-gray-100 px-1 rounded">input</code> contains the user's response to the previous prompt</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 border-b pb-2">Response Format</h2>
                        <p className="mb-2">Your API should respond with the following:</p>
                        
                        <h3 className="font-semibold mt-4">1. Response Headers</h3>
                        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto mt-2">
                            {`Content-Type: application/json
Freeflow: "FC" or "FB"  // FC for Continue, FB for Break/End`}
                        </div>
                        
                        <h3 className="font-semibold mt-4">2. Response Body</h3>
                        <p className="mb-2">The response body should contain the text to display to the user.</p>
                        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                            {`"Welcome to USSD Service\n1. Check Balance\n2. Transfer Money\n3. Buy Airtime"`}
                        </div>

                        <div className="mt-4">
                            <h3 className="font-semibold">Notes:</h3>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>The <code className="bg-gray-100 px-1 rounded">Freeflow</code> header value determines if the session continues or ends</li>
                                <li>When <code className="bg-gray-100 px-1 rounded">Freeflow</code> is "FC", the emulator will show an input field for the user's response</li>
                                <li>When <code className="bg-gray-100 px-1 rounded">Freeflow</code> is "FB", the emulator will display only an "End" button</li>
                                <li>The response body supports line breaks using "\\n" characters</li>
                                <li>To create menus, include numbered options in the response body (e.g., "1. Check Balance\\n2. Transfer Money")</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 border-b pb-2">Server-Side Implementation (Elixir Example)</h2>
                        <p className="mb-2">The emulator expects a response with the Freeflow header. Here's an example of how to format the response in Elixir:</p>
                        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                            {`defp send_response(response, conn) do
  conn
  |> put_status(:ok)
  |> put_resp_header("Freeflow", (if response["type"] == 2, do: "FC", else: "FB"))
  |> send_resp(:ok, response["body"])
end`}
                        </div>
                        
                        <div className="mt-4">
                            <h3 className="font-semibold">Response Parameter Examples:</h3>
                            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto mt-2">
                                {`# Continue session (menu)
response = %{
  "type" => 2,  # 2 means continue (FC)
  "body" => "Welcome\\n1. Check Balance\\n2. Transfer"
}

# End session (final message)
response = %{
  "type" => 1,  # Any value other than 2 means break/end (FB)
  "body" => "Your balance is $100.00"
}`}
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 border-b pb-2">Example Flow</h2>

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
                                {`HTTP/1.1 200 OK
Freeflow: FC
Content-Type: text/plain

Welcome to USSD Service
1. Check Balance
2. Transfer Money
3. Buy Airtime`}
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
                                {`HTTP/1.1 200 OK
Freeflow: FB
Content-Type: text/plain

Your current balance is $100.00`}
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 border-b pb-2">Error Handling</h2>
                        <p>If your API encounters an error, you can return an error message with the appropriate Freeflow header:</p>
                        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-2 overflow-x-auto">
                            {`HTTP/1.1 200 OK
Freeflow: FC  # FC to allow retry, or FB to end the session
Content-Type: text/plain

Error: Invalid selection. Please try again.`}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DocumentationPage;
