/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AnnouncementBar from './components/AnnouncementBar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import FloatingActions from './components/FloatingActions';

export default function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900">
          <AnnouncementBar />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <FloatingActions />
        </div>
      </ErrorBoundary>
    </Router>
  );
}
