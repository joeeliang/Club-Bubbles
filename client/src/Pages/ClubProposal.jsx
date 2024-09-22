import React, { useEffect, useState, useRef } from 'react';
import BlurFade from "@/components/magicui/blur-fade";
import FlickeringGrid from "../components/magicui/flickering-grid";
import LetterPullup from "@/components/magicui/letter-pullup";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";

const ClubProposal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        // Disable scrolling
        document.body.style.overflow = 'hidden';

        // Intersection Observer for fade-in effect
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect(); // Stop observing after it becomes visible
            }
        }, { threshold: 0.1 });

        if (formRef.current) {
            observer.observe(formRef.current);
        }

        // Cleanup function to reset the overflow property on unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const [proposalContent, setProposalContent] = useState('');
    const [authenticityScore, setAuthenticityScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendProposal = async () => {
        setLoading(true);
        setError(null); // Reset error state before making request

        try {
            const response = await fetch("http://127.0.0.1:8000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: proposalContent }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setAuthenticityScore(data.authenticity_score);
        } catch (error) {
            setError("Failed to fetch authenticity score. Please try again.");
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendProposal();
    };

    return (
        <div className="tw-overflow-hidden tw-bg-cover tw-bg-fixed tw-bg-center tw-flex tw-items-center tw-justify-center tw-h-screen tw-bg-gradient-to-r tw-from-blue-950 tw-to-blue-200">
            <FlickeringGrid
                className="tw-z-0 tw-absolute tw-inset-0 tw-h-screen tw-w-screen"
                squareSize={3}
                gridGap={7}
                color="#6B7280"
                maxOpacity={0.5}
                flickerChance={0.1}
                height={1000}
                width={2000}
            />
            <div ref={formRef} className="tw-bg-blue-900 tw-shadow-lg tw-rounded-lg tw-p-8 tw-max-w-lg tw-w-full tw-z-10">
                <BlurFade inView={isVisible}>
                    <div>
                        <LetterPullup words={"Submit Your Club Proposal"} delay={0.05} className="tw-text-2xl tw-font-bold tw-text-center tw-text-white tw-mb-6"/>
                        <form onSubmit={handleSubmit}>
                            <div className="tw-mb-4">
                                <label className="tw-block tw-text-gray-300 tw-mb-2" htmlFor="proposal">
                                    Club Proposal
                                </label>
                                <textarea
                                    id="proposal"
                                    className="tw-w-full tw-p-3 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-border-blue-500 focus:outline-none"
                                    placeholder="Enter your club proposal here..."
                                    rows="6"
                                    value={proposalContent}
                                    onChange={(e) => setProposalContent(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="z-10 flex min-h-[16rem] items-center justify-center">
                                <div
                                    className={cn(
                                        "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
                                    )}
                                >
                                    <AnimatedShinyText
                                        className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                                        <span>✨ Introducing Magic UI</span>
                                        <ArrowRightIcon
                                            className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"/>
                                    </AnimatedShinyText>
                                </div>
                            </div>
                            {loading ? 'Submitting...' : 'Submit Proposal'}
                    </form>

                    {/* Display authenticity score or error */}
                    {authenticityScore !== null && (
                        <p className="tw-mt-4 tw-text-center tw-text-green-500">
                            Authenticity Score: {authenticityScore}
                        </p>
                    )}
                    {error && (
                        <p className="tw-mt-4 tw-text-center tw-text-red-500">
                            {error}
                        </p>
                    )}
            </div>
        </BlurFade>
</div>
</div>
)
    ;
};

export default ClubProposal;
