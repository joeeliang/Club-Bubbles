import React, { useEffect, useState, useRef } from 'react';
import BlurFade from "@/components/magicui/blur-fade";
import FlickeringGrid from "../components/magicui/flickering-grid";

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
    const [category, setCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const categories = [
        'Humanities',
        'STEM',
        'Entertainment',
        'Arts',
        'Athletics',
    ];
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

        try {
            const response = await fetch("http://127.0.0.1:8000/categorize", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: proposalContent }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const cate = await response.json();
            setCategory(cate.category);
            setSelectedCategory(cate.category); // Set default selected category
        } catch (error) {
            setError("Failed to fetch category. Please try again.");
            console.error("Error:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendProposal();
    };

    return (
        <div className="tw-flex tw-items-center tw-justify-center tw-h-screen tw-bg-gradient-to-r tw-from-blue-950 tw-to-blue-200">
            <div className="tw-bg-blue-900 tw-shadow-lg tw-rounded-lg tw-p-8 tw-max-w-lg tw-w-full">
                <h2 className="tw-text-2xl tw-font-bold tw-text-center tw-text-white tw-mb-6">
                    Submit Your Club Proposal
                </h2>
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
                    <button
                        type="submit"
                        className="tw-w-full tw-bg-blue-600 tw-text-white tw-font-semibold tw-p-3 tw-rounded-lg hover:tw-bg-blue-700 focus:outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-ring-opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Proposal'}
                    </button>

                    {/* Display category dropdown */}
                    {category && (
                        <div className="tw-mt-4">
                            <label className="tw-block tw-text-gray-300 tw-mb-2" htmlFor="category">
                                Category
                            </label>
                            <select
                                id="category"
                                className="tw-w-full tw-p-3 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-border-blue-500 focus:outline-none"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

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
                </form>
            </div>
        </div>
    );
};

export default ClubProposal;