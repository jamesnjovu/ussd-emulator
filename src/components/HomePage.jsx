import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const HomePage = ({ navigateTo }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <>
            {/* SEO Head Tags */}
            <Helmet>
                <title>USSD Emulator - Test Your USSD Services Without a Real Phone</title>
                <meta name="description" content="A simple, powerful emulator for developing and testing USSD applications with real-time feedback. No physical device needed." />
                <meta name="keywords" content="USSD, emulator, development, testing, API, telecom, mobile development" />
                <link rel="canonical" href="https://jamesnjovu.github.io/ussd-emulator/" />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-md py-4">
                    <div className="container mx-auto px-4 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <span className="text-blue-600 text-2xl font-bold">USSD Emulator</span>
                        </div>
                        <nav>
                            <ul className="flex space-x-6">
                                <li>
                                    <a href="#features" className="text-gray-600 hover:text-blue-600 transition duration-300">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition duration-300">
                                        How It Works
                                    </a>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => navigateTo('documentation')}
                                        className="text-gray-600 hover:text-blue-600 transition duration-300"
                                    >
                                        Documentation
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className={`container mx-auto px-4 py-16 flex flex-col md:flex-row items-center transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 leading-tight">
                            Test Your USSD Services <span className="text-blue-600">Without a Real Phone</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            A simple, powerful emulator for developing and testing USSD applications with real-time feedback.
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <button
                                onClick={() => navigateTo('emulator')}
                                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium text-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition duration-300"
                                aria-label="Launch USSD Emulator"
                            >
                                Launch Emulator
                            </button>
                            <button
                                onClick={() => navigateTo('documentation')}
                                className="px-8 py-4 bg-white text-blue-600 border border-blue-600 rounded-lg font-medium text-lg hover:bg-blue-50 transform hover:scale-105 transition duration-300"
                                aria-label="View API Documentation"
                            >
                                View API Docs
                            </button>
                        </div>
                    </div>
                    <div className="md:w-1/2 transform transition-transform duration-700 hover:scale-105">
                        <div className="bg-gray-900 rounded-[60px] p-4 shadow-2xl w-72 mx-auto">
                            <div className="bg-gray-800 rounded-[48px] overflow-hidden">
                                <div className="bg-gray-800 text-white p-4 text-center font-medium rounded-t-3xl">
                                    <div className="w-16 h-1 bg-gray-600 mx-auto mb-2 rounded-full"></div>
                                    USSD Preview
                                </div>
                                <div className="bg-gray-100 p-6 h-64 flex flex-col items-center justify-center">
                                    <div className="font-mono text-center bg-white p-4 w-full rounded-lg shadow-inner border border-gray-300">
                                        <p className="text-lg mb-2">*123#</p>
                                        <p className="text-sm text-gray-600 mb-4">Press send to continue</p>
                                        <button className="bg-green-500 text-white rounded-full px-4 py-1 text-sm">
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="bg-gray-50 py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Key Features</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Realistic Phone Interface",
                                    description: "Experience USSD like on a real mobile phone with a responsive keypad and screen.",
                                    icon: "📱",
                                },
                                {
                                    title: "API Integration",
                                    description: "Connect to your backend easily and test your USSD service in real-time.",
                                    icon: "🔄",
                                },
                                {
                                    title: "Session Management",
                                    description: "Full session tracking and history to debug complex USSD flows.",
                                    icon: "🔍",
                                },
                            ].map((feature, index) => (
                                <div 
                                    key={index} 
                                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300"
                                >
                                    <div className="text-4xl mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section id="how-it-works" className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
                        <div className="max-w-3xl mx-auto">
                            <div className="flex flex-col space-y-8">
                                {[
                                    {
                                        step: "1",
                                        title: "Configure Your API",
                                        description: "Enter your API endpoint URL and a test mobile number to get started.",
                                    },
                                    {
                                        step: "2",
                                        title: "Dial USSD Code",
                                        description: "Use the keypad to enter a USSD code like *123# and press send.",
                                    },
                                    {
                                        step: "3",
                                        title: "Interact with Menus",
                                        description: "Navigate through your USSD menus just like a real user would on their phone.",
                                    },
                                    {
                                        step: "4",
                                        title: "Debug and Improve",
                                        description: "Use the session history to track interactions and improve your USSD service.",
                                    },
                                ].map((item, index) => (
                                    <div key={index} className="flex">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                                            {item.step}
                                        </div>
                                        <div className="ml-6">
                                            <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                                            <p className="text-gray-600">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section - Good for SEO */}
                <section id="faq" className="bg-gray-50 py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h2>
                        <div className="max-w-3xl mx-auto space-y-8">
                            {[
                                {
                                    question: "What is USSD and why do I need an emulator?",
                                    answer: "USSD (Unstructured Supplementary Service Data) is a protocol used by mobile phones to communicate with service providers. A USSD emulator allows developers to test their USSD services without needing actual mobile devices or telecom infrastructure."
                                },
                                {
                                    question: "Do I need special hardware to use this emulator?",
                                    answer: "No, the USSD Emulator runs completely in your web browser. You don't need any special hardware or software installations to get started."
                                },
                                {
                                    question: "How do I connect my backend API to the emulator?",
                                    answer: "Simply enter your API endpoint URL in the configuration screen when launching the emulator. Make sure your API follows the documentation guidelines for request and response formats."
                                },
                                {
                                    question: "Can I test complex USSD flows with multiple screens?",
                                    answer: "Yes, the emulator supports full session management, allowing you to test multi-screen USSD flows with branching paths and varying response types."
                                },
                                {
                                    question: "Is the emulator suitable for production testing?",
                                    answer: "While the emulator is excellent for development and initial testing, we recommend also testing with actual devices and telecom providers before full production deployment."
                                }
                            ].map((faq, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow">
                                    <h3 className="text-xl font-semibold mb-3 text-gray-800">{faq.question}</h3>
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-blue-600 py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6 text-white">Ready to Test Your USSD Service?</h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Start developing and testing your USSD applications with our easy-to-use emulator.
                        </p>
                        <button
                            onClick={() => navigateTo('emulator')}
                            className="px-8 py-4 bg-white text-blue-600 rounded-lg font-medium text-lg shadow-lg hover:bg-blue-50 transform hover:scale-105 transition duration-300"
                            aria-label="Launch USSD Emulator Now"
                        >
                            Launch Emulator Now
                        </button>
                    </div>
                </section>

                {/* Footer with structured contact info (good for SEO) */}
                <footer className="bg-gray-800 text-white py-8">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="mb-4 md:mb-0">
                                <p className="text-lg font-semibold">USSD Emulator</p>
                                <p className="text-gray-400 text-sm">© {new Date().getFullYear()} All rights reserved</p>
                                <div itemScope itemType="http://schema.org/SoftwareApplication" className="hidden">
                                    <meta itemProp="name" content="USSD Emulator" />
                                    <meta itemProp="description" content="A powerful USSD emulator for developers" />
                                    <meta itemProp="applicationCategory" content="DeveloperApplication" />
                                    <meta itemProp="operatingSystem" content="Web" />
                                </div>
                            </div>
                            <div className="flex space-x-6">
                                <button onClick={() => navigateTo('documentation')} className="text-gray-400 hover:text-white transition duration-300">
                                    Documentation
                                </button>
                                <button onClick={() => navigateTo('emulator')} className="text-gray-400 hover:text-white transition duration-300">
                                    Emulator
                                </button>
                                <a href="https://github.com/jamesnjovu/ussd-emulator" className="text-gray-400 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
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

export default HomePage;
