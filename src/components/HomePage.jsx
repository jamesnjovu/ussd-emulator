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
export default HomePage;
