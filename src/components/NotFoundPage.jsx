import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const NotFoundPage = ({ navigateTo }) => {
    const [countdown, setCountdown] = useState(5);

    // Auto-redirect to home after countdown
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            navigateTo('home');
        }
    }, [countdown, navigateTo]);

    return (
        <>
            <Helmet>
                <title>Page Not Found | USSD Emulator</title>
                <meta name="description" content="The page you are looking for could not be found. Redirecting to the USSD Emulator homepage." />
                <meta name="robots" content="noindex, follow" />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg animate-fadeIn">
                    <div className="text-9xl font-bold text-blue-600 mb-4">404</div>
                    <h1 className="text-3xl font-bold mb-4 text-gray-800">Page Not Found</h1>

                    <p className="text-lg text-gray-600 mb-8">
                        The page you are looking for might have been removed, had its name changed,
                        or is temporarily unavailable.
                    </p>

                    <p className="text-gray-500 mb-6">
                        Redirecting to home in <span className="font-bold text-blue-600">{countdown}</span> seconds...
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button
                            onClick={() => navigateTo('home')}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 transition duration-300"
                            aria-label="Go to Home Page"
                        >
                            Go to Home Page
                        </button>
                        <button
                            onClick={() => navigateTo('emulator')}
                            className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition duration-300"
                            aria-label="Launch Emulator"
                        >
                            Launch Emulator
                        </button>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Looking for something?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="font-medium mb-2 text-gray-800">USSD Emulator</h3>
                            <p className="text-gray-600 mb-3">
                                Test your USSD services without a real phone using our interactive emulator.
                            </p>
                            <button
                                onClick={() => navigateTo('emulator')}
                                className="text-blue-600 hover:underline"
                            >
                                Go to Emulator →
                            </button>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="font-medium mb-2 text-gray-800">API Documentation</h3>
                            <p className="text-gray-600 mb-3">
                                Learn how to integrate your services with our USSD Emulator.
                            </p>
                            <button
                                onClick={() => navigateTo('documentation')}
                                className="text-blue-600 hover:underline"
                            >
                                View Documentation →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;
