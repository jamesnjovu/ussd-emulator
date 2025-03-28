import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const DocumentationPage = ({ navigateTo }) => {
    const [isExiting, setIsExiting] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const [activeSection, setActiveSection] = useState('overview');

    // Handle entrance animation
    useEffect(() => {
        setTimeout(() => {
            setFadeIn(true);
        }, 100);
    }, []);

    // Handle back navigation with animation
    const handleBackNavigation = () => {
        setIsExiting(true);
        setTimeout(() => {
            navigateTo('home');
        }, 500);
    };

    // Handle section navigation
    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* SEO Meta Tags */}
            <Helmet>
                <title>USSD Emulator API Documentation - Developer Guide</title>
                <meta name="description" content="Complete API documentation for integrating with the USSD Emulator. Learn about request formats, response handling, and example flows for USSD service testing." />
                <meta name="keywords" content="USSD API, USSD documentation, Freeflow header, USSD request format, USSD response format, USSD testing" />
                <link rel="canonical" href="https://jamesnjovu.github.io/ussd-emulator/documentation" />
                <script type="application/ld+json">
                    {`
                    {
                      "@context": "https://schema.org",
                      "@type": "TechArticle",
                      "headline": "USSD Emulator API Documentation",
                      "description": "Complete API documentation for integrating with the USSD Emulator",
                      "author": {
                        "@type": "Person",
                        "name": "James Njovu"
                      },
                      "datePublished": "2025-03-28"
                    }
                `}
                </script>
            </Helmet>

            <div className={`min-h-screen bg-gradient-to-b from-blue-50 to-white transition-opacity duration-500 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'} ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
                {/* Header */}
                <header className="bg-white shadow-md py-4 sticky top-0 z-10">
                    <div className="container mx-auto px-4 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <span className="text-blue-600 text-xl font-bold">USSD Emulator</span>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => navigateTo('emulator')}
                                className="text-gray-600 hover:text-blue-600 transition duration-300"
                            >
                                Launch Emulator
                            </button>
                            <button
                                onClick={handleBackNavigation}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
                            >
                                Back to Home
                            </button>
                        </div>
                    </div>
                </header>

                <div className="flex container mx-auto px-4 pt-6 pb-12">
                    {/* Sidebar navigation */}
                    <div className="hidden md:block w-64 pr-8">
                        <div className="sticky top-24">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Documentation</h3>
                            <nav className="space-y-1">
                                {[
                                    { id: 'overview', label: 'Overview' },
                                    { id: 'request-format', label: 'Request Format' },
                                    { id: 'response-format', label: 'Response Format' },
                                    { id: 'implementation', label: 'Implementation' },
                                    { id: 'example-flow', label: 'Example Flow' },
                                    { id: 'error-handling', label: 'Error Handling' }
                                ].map(section => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${activeSection === section.id
                                            ? 'bg-blue-100 text-blue-700 font-medium'
                                            : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {section.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="flex-1 max-w-3xl mx-auto">
                        <div className="bg-white rounded-xl shadow-xl p-8">
                            <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">USSD Emulator API Documentation</h1>

                            <div className="space-y-12">
                                <section id="overview" className="scroll-mt-24 animate-fadeIn">
                                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Overview</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        The USSD Emulator interacts with your API to simulate USSD service interactions. This document outlines the expected request and response formats for seamless integration.
                                    </p>
                                    <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                                        <p className="text-blue-700">
                                            <strong>Tip:</strong> Use the emulator to test your USSD application without needing a physical device or telecom integration.
                                        </p>
                                    </div>
                                </section>

                                <section id="request-format">
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

                                <section id="response-format">
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

                                <section id="example-flow">
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

                                <section id="implementation">
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

                                <section id="error-handling" className="scroll-mt-24 animate-fadeIn">
                                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Error Handling</h2>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        The USSD Emulator handles various types of errors that may occur during API requests and provides appropriate feedback to the user.
                                    </p>

                                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Common Errors</h3>

                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-red-500">
                                            <h4 className="font-semibold text-gray-800 mb-2">CORS Errors</h4>
                                            <p className="text-gray-600">
                                                Cross-Origin Resource Sharing (CORS) errors occur when your API server doesn't allow requests from the domain where the emulator is hosted.
                                            </p>
                                            <pre className="bg-gray-800 text-white p-3 rounded-md text-sm mt-2 overflow-x-auto">
                                                Access to fetch at 'https://your-api.com/ussd' from origin 'https://jamesnjovu.github.io' has been blocked by CORS policy
                                            </pre>

                                            <h5 className="font-semibold mt-4 mb-2">Solutions:</h5>
                                            <ol className="list-decimal list-inside space-y-2 text-gray-600">
                                                <li>
                                                    <span className="font-medium">Enable CORS on your server:</span> Configure your API to include these headers:
                                                    <pre className="bg-gray-800 text-white p-3 rounded-md text-sm mt-1 overflow-x-auto">
                                                        Access-Control-Allow-Origin: *  // Or your specific domain
                                                        Access-Control-Allow-Methods: POST, OPTIONS
                                                        Access-Control-Allow-Headers: Content-Type
                                                    </pre>
                                                </li>
                                                <li>
                                                    <span className="font-medium">Use the built-in CORS proxy option:</span> In the emulator setup, check the "Use CORS proxy" option.
                                                </li>
                                                <li>
                                                    <span className="font-medium">Manually use a CORS proxy in your API URL:</span>
                                                    <pre className="bg-gray-800 text-white p-3 rounded-md text-sm mt-1 overflow-x-auto">
                                                        https://corsproxy.io/?https://your-api.com/ussd
                                                    </pre>
                                                </li>
                                                <li>
                                                    <span className="font-medium">Run the emulator locally:</span> When using localhost, CORS restrictions are more relaxed.
                                                </li>
                                            </ol>
                                        </div>

                                        <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-yellow-500">
                                            <h4 className="font-semibold text-gray-800 mb-2">Timeout Errors</h4>
                                            <p className="text-gray-600">
                                                If your API doesn't respond within 15 seconds, the request will time out. Ensure your API responds promptly to USSD requests.
                                            </p>
                                        </div>

                                        <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                                            <h4 className="font-semibold text-gray-800 mb-2">Network Errors</h4>
                                            <p className="text-gray-600">
                                                These can occur if your API URL is incorrect or the server is down. Double-check your API URL and ensure your server is running.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-8 mt-12">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="mb-4 md:mb-0">
                                <p className="text-lg font-semibold">USSD Emulator</p>
                                <p className="text-gray-400 text-sm">© {new Date().getFullYear()} All rights reserved</p>
                            </div>
                            <div className="flex space-x-6">
                                <button
                                    onClick={() => navigateTo('emulator')}
                                    className="text-gray-400 hover:text-white transition duration-300"
                                >
                                    Launch Emulator
                                </button>
                                <button
                                    onClick={handleBackNavigation}
                                    className="text-gray-400 hover:text-white transition duration-300"
                                >
                                    Back to Home
                                </button>
                                <a
                                    href="https://github.com/jamesnjovu/ussd-emulator"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition duration-300"
                                >
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default DocumentationPage;
