"use client";

import { useEffect } from 'react';
import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";
import { UserProvider } from './Pages/userContext'; // Add this line

import NavbarComponent from './components/NavbarComponent.jsx';
import { MarqueeEffect } from "./components/MarqueeEffect.jsx";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Signup from './Pages/Signup.jsx';
import Browse from './Pages/Browse.jsx';
import Login from './Pages/Login.jsx';
import ClubProposal from "@/Pages/ClubProposal.jsx";
import BrowseMy from "./Pages/BrowseMyClubs.jsx";

function App() {
    return (
        <UserProvider> {/* Add this line */}
        <Router>
            <div className="tw-bg-gradient-to-r tw-from-dark-blue tw-to-aqua tw-min-h-screen tw-w-screen tw-scrollbar-hidden">
                <NavbarComponent/>
                <Routes>
                    <Route path="/" element={<PageWrapper/>}/>
                    <Route path="/browse" element={<Browse/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element = {<Signup />} />
                    <Route path="/proposal" element={<ClubProposal/>}/>
                    <Route path="/myclubs" element={<BrowseMy/>}/>
                </Routes>
            </div>
        </Router>
        </UserProvider>
    );
}

import PropTypes from 'prop-types';

function PageWrapper({content}) {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [location]);

    return (
        <>
            {location.pathname === '/' && (
                <>
                    <DotPattern
                        className={cn(
                            "[mask-image:radial-gradient(1500px_circle_at_center,white,transparent)]",
                        )}
                    />
                <GradualSpacing
                    className="tw-font-display tw-text-center tw-text-6xl tw-font-bold tw-tracking-[-0.1em] tw-text-zinc-300 tw-dark:text-white tw-my-20"
                    text="Club Bubbles"
                />
                <MarqueeEffect />
                </>
            )}
            {content}

        </>
    );
}

PageWrapper.propTypes = {
    content: PropTypes.node,
};

export default App;
