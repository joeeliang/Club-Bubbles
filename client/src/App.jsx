"use client";

import RetroGrid from "@/components/magicui/retro-grid";
import NavbarComponent from './components/NavbarComponent.jsx';
import { MarqueeDemo } from "./components/MarqueeDemo.jsx";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import ClubProposal from "@/Pages/ClubProposal.jsx";
import Browse from './Pages/Browse.jsx';
import Join from './Pages/Join.jsx';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';

function App() {
    return (
        <Router>
            <div className="tw-bg-gradient-to-r tw-from-blue-950 tw-to-blue-200 tw-min-h-screen tw-w-screen tw-scrollbar-hidden">
                <div
                    className="tw-relative tw-flex tw-h-[500px] tw-w-full tw-flex-col tw-items-center tw-justify-center tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background md:tw-shadow-xl">
    <span
        className="tw-pointer-events-none tw-z-10 tw-whitespace-pre-wrap tw-bg-gradient-to-b tw-from-[#ffd319] tw-via-[#ff2975] tw-to-[#8c1eff] tw-bg-clip-text tw-text-center tw-text-7xl tw-font-bold tw-leading-none tw-tracking-tighter tw-text-transparent">
        Retro Grid
    </span>

                    <RetroGrid/>
                </div>

                <NavbarComponent/>

                <Routes>
                    <Route path="/" element={<PageWrapper/>}/>
                    <Route path="/browse" element={<Browse/>}/>
                    <Route path="/join" element={<Join/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/proposal" element={<ClubProposal/>}/>
                </Routes>
            </div>
        </Router>
    );
}

function PageWrapper({ content }) {
    const location = useLocation();

    return (
        <>
            {location.pathname === '/' && (
                <>
                <GradualSpacing
                    className="tw-font-display tw-text-center tw-text-6xl tw-font-bold tw-tracking-[-0.1em] tw-text-black tw-dark:text-white tw-md:text-7xl tw-md:leading-[5rem] tw-my-4"
                    text="Browsing"
                />
                <MarqueeDemo />
                </>
            )}
            {content}
        </>
    );
}

export default App;
