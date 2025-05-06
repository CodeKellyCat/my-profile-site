import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ExperiencePage from '../pages/ExperiencePage';
import ProjectsPage from '../pages/ProjectsPage';
import ContactPage from '../pages/ContactPage';
import SingleProject from '../components/SingleProject';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/global.css';

function AppRouter() {
    return (
        <HelmetProvider>
            <Helmet>
                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="Kelly" />
                <link rel="manifest" href="/site.webmanifest" />
            </Helmet>
            <Router>
                <Navbar />
                <div className="content-wrapper">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/experience" element={<ExperiencePage />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/project/:slug" element={<SingleProject />} /> {/* Add the route for SingleProject */}
                    </Routes>
                </div>
                <Footer /> {/* Always render the Footer in AppRouter */}
            </Router>
        </HelmetProvider>
    );
}

export default AppRouter;