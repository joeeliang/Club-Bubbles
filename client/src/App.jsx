"use client";

import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";

import Ripple from "./components/magicui/ripple.jsx";
import NavbarComponent from './components/NavbarComponent.jsx';
import { MarqueeDemo } from "./components/MarqueeDemo.jsx";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import Browse from './Pages/Browse.jsx';
import Join from './Pages/Join.jsx';
import Login from './Pages/Login.jsx';
import ClubProposal from "./Pages/ClubProposal.jsx";

function App() {
    return (
        <Router>
            <div className="tw-bg-gradient-to-r tw-from-blue-950 tw-to-blue-200 tw-min-h-screen tw-w-screen tw-scrollbar-hidden">
                <NavbarComponent/>

                <Routes>
                    <Route path="/" element={<PageWrapper/>}/>
                    <Route path="/browse" element={<Browse/>}/>
                <Route path="/join" element={<Join/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/proposal" element={<ClubProposal/>}/>
                </Routes>
            </div>
        </Router>
    );
}

function PageWrapper() {
    const location = useLocation();

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
                    className="tw-font-display tw-text-center tw-text-6xl tw-font-bold tw-tracking-[-0.1em] tw-text-black tw-dark:text-white tw-md:text-7xl tw-md:leading-[5rem] tw-my-4"
                    text="Browsing"
                />
                <MarqueeDemo />
                </>
            )}
            {location.pathname === '/browse' && (
                <Ripple />
            )}
            
        </>
    );
}

export default App;
