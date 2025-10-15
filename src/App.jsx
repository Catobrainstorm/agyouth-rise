import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import News from './pages/News';
import Projects from './pages/Projects';
import Media from './pages/Media';
import Admin from './admin/Admin';

// Import your actual media components
import Podcast from './media/Podcast';  // ADD THIS
import Gallery from './media/Gallery';  // ADD THIS

// Coming Soon component for placeholder pages
const ComingSoon = ({ title }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          {title}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Coming Soon
        </p>
        <div className="inline-block animate-pulse">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/media" element={<Media />} />
          
          {/* Projects Routes */}
          <Route path="/projects/training" element={<ComingSoon title="Training Programs" />} />
          <Route path="/projects/podcast" element={<ComingSoon title="AgYouth Rise Podcast" />} />
          <Route path="/projects/community-clubs" element={<ComingSoon title="Community Clubs" />} />
          <Route path="/projects/summit" element={<ComingSoon title="Stakeholders Summit" />} />
          
          {/* Media Routes - USE YOUR ACTUAL COMPONENTS */}
          <Route path="/media/podcast" element={<Podcast />} />
          <Route path="/media/gallery" element={<Gallery />} />

          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;