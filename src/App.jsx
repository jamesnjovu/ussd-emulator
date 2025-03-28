import React, { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './components/HomePage';
import DocumentationPage from './components/Documentation';
import USSDEmulator from './components/UssdEmulator';
import NotFoundPage from './components/NotFoundPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [_prevPage, setPrevPage] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Track page views for analytics when page changes
  useEffect(() => {
    // Only track in production
    if (process.env.NODE_ENV === 'production') {
      // Track page view - usually with Google Analytics or similar
      const pageTitle = {
        'home': 'USSD Emulator - Home',
        'emulator': 'USSD Emulator - Test Your USSD Services',
        'documentation': 'USSD Emulator - API Documentation'
      }[currentPage] || 'USSD Emulator';
      
      // Example of tracking with window.gtag if Google Analytics is set up
      if (window.gtag) {
        window.gtag('config', 'G-XXXXXXXXXX', {
          page_path: `/${currentPage === 'home' ? '' : currentPage}`,
          page_title: pageTitle
        });
      }
    }
  }, [currentPage]);

  // Handle page navigation with transition
  const navigateTo = (page) => {
    if (page === currentPage) return;
    
    setPrevPage(currentPage);
    setIsTransitioning(true);
    
    // Update the URL for better SEO and sharing
    if (page === 'home') {
      window.history.pushState({}, '', '/');
    } else {
      window.history.pushState({}, '', `/${page}`);
    }
    
    // Wait for exit animation to complete before changing page
    setTimeout(() => {
      setCurrentPage(page);
      
      // After page changes, wait a bit then remove the transitioning state
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 300);
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/' || path === '') {
        setCurrentPage('home');
      } else {
        const page = path.substring(1); // Remove leading slash
        if (['emulator', 'documentation'].includes(page)) {
          setCurrentPage(page);
        } else {
          setCurrentPage('home'); // Default to home for unknown routes
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Set initial page based on URL for deep linking
  useEffect(() => {
    const path = window.location.pathname;
    
    // Remove the base path if it exists (for GitHub Pages)
    const basePath = '/ussd-emulator';
    const normalizedPath = path.startsWith(basePath) 
      ? path.substring(basePath.length) 
      : path;
    
    if (normalizedPath === '/' || normalizedPath === '') {
      setCurrentPage('home');
    } else if (normalizedPath === '/emulator') {
      setCurrentPage('emulator');
    } else if (normalizedPath === '/documentation') {
      setCurrentPage('documentation');
    } else {
      setCurrentPage('notFound'); // For any other paths, show 404
    }
  }, []);

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        {/* Current page with transition classes */}
        <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
          {currentPage === 'emulator' && <USSDEmulator navigateTo={navigateTo} />}
          {currentPage === 'documentation' && <DocumentationPage navigateTo={navigateTo} />}
          {currentPage === 'notFound' && <NotFoundPage navigateTo={navigateTo} />}
        </div>
      </div>
    </HelmetProvider>
  );
}

export default App;
