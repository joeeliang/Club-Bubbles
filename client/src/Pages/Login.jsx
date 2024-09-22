import { useEffect, useState, useRef, useContext } from 'react';

import FlickeringGrid from "../components/magicui/flickering-grid";
import BlurFade from "@/components/magicui/blur-fade";
import '../index.css';
import GradualSpacing from "@/components/magicui/gradual-spacing";
import ShinyButton from "@/components/magicui/shiny-button.jsx";
import { UserContext } from './userContext';


const Login = () => {
    const { setUser } = useContext(UserContext);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();



    // useEffect should be outside of handleSubmit
    useEffect(() => {
        // Disable scrolling
        document.body.style.overflow = 'hidden';

        // Intersection Observer to determine when the login box is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Stop observing once it has appeared
                }
            });
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        // Cleanup function to reset the overflow property on unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted:", { username, password });
    };

    return (
        <div
            className="tw-overflow-hidden tw-bg-cover tw-bg-fixed tw-bg-center tw-flex tw-items-center tw-justify-center tw-bg-gradient-to-r tw-from-dark-blue tw-to-aqua tw-min-h-screen tw-w-screen tw-scrollbar-hidden">
            <FlickeringGrid
                className="tw-z-5 tw-absolute tw-inset-0 tw-h-screen tw-w-screen"
                squareSize={3}
                gridGap={7}
                color="#6B7280"
                maxOpacity={0.5}
                flickerChance={0.1}
                height={1500}
                width={2000}
            />
            <div ref={ref}
                 className="tw-bg-gradient-to-r tw-from-dark-blue tw-to-marine tw-shadow-lg tw-absolute tw-z-0 tw-rounded-xl tw-p-8 tw-max-w-sm tw-w-full tw-bg-opacity-80 tw-overflow-hidden">
                <BlurFade inView={isVisible}>
                    <div>
                        <GradualSpacing
                            className="tw-text-2xl tw-font-bold tw-text-center tw-mb-6 tw-text-white"
                            text="Login to Your Account"
                        />
                        <form onSubmit={handleSubmit}>
                            <div className="tw-mb-4">
                                <label className="tw-block tw-text-gray-300 tw-mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="tw-w-full tw-p-3 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-border-blue-500 focus:outline-none"
                                    placeholder="you@example.com"
                                    required
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div className="tw-mb-6">
                                <label className="tw-block tw-text-gray-300 tw-mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="tw-w-full tw-p-3 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-border-blue-500 focus:outline-none"
                                    placeholder="********"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <ShinyButton
                                type="submit"
                                className="tw-w-full tw-p-3 tw-rounded-lg tw-bg-zinc-300 tw-border-2 tw-border-zinc-600"
                            >
                                Login
                            </ShinyButton>
                        </form>
                        <p className="tw-mt-4 tw-text-center tw-text-gray-300">
                            Don't have an account? <a href="/Signup" className="tw-text-blue-400 hover:tw-underline">Sign up here.</a>
                        </p>
                    </div>
                </BlurFade>
            </div>
        </div>
    );
};

export default Login;
