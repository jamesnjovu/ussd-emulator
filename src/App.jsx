import React, { useState } from 'react'
import HomePage from './components/HomePage'
import DocumentationPage from './components/Documentation'
import USSDEmulator from './components/UssdEmulator'

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

export default App
