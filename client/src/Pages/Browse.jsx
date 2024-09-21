import React, { useState } from 'react';
import BlurFade from "@/components/magicui/blur-fade";
import SeverityIndicator from '@/components/severity';

const clubsData = [
    { id: 1, name: "Coding Club", description: "A club for coding enthusiasts.", severity: 3 },
    { id: 2, name: "Art Club", description: "Explore your artistic side.", severity: 2 },
    { id: 3, name: "Music Club", description: "For music lovers and musicians.", severity: 4 },
    { id: 4, name: "Book Club", description: "Read and discuss great books.", severity: 1 },
    { id: 5, name: "Sports Club", description: "For sports and fitness activities.", severity: 10 },
];

const gradients = [
    "tw-bg-gradient-to-r tw-from-blue-400 tw-to-blue-600",
    "tw-bg-gradient-to-r tw-from-purple-400 tw-to-purple-600",
    "tw-bg-gradient-to-r tw-from-green-400 tw-to-green-600",
    "tw-bg-gradient-to-r tw-from-yellow-400 tw-to-yellow-600",
    "tw-bg-gradient-to-r tw-from-red-400 tw-to-red-600",
];

const Browse = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClubs, setFilteredClubs] = useState(clubsData);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        setFilteredClubs(
            clubsData.filter(club =>
                club.name.toLowerCase().includes(term.toLowerCase())
            )
        );
    };

    return (
        <>
            <BlurFade delay={0.25 * 0.05} inView>
                <h1 className="tw-text-4xl tw-font-bold tw-text-center tw-text-gray-800 tw-my-8">
                    Browse Clubs
                </h1>
            </BlurFade>
            <BlurFade delay={0.15} inView>
                <div className="tw-flex tw-justify-center tw-mb-6 tw-text-white">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="tw-p-3 tw-w-1/2 tw-border-b tw-border-gray-300 tw-bg-transparent focus:tw-outline-none focus:tw-ring-0"
                        placeholder="Search for clubs..."
                    />
                </div>
            </BlurFade>
            <div className="tw-mb-6"></div>
            {/* Margin between search bar and clubs */}
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
                {filteredClubs.length > 0? (
                    filteredClubs.map((club, index) => (
                        <BlurFade key={club.id} delay={0.25 + club.id * 0.05} inView>
                            <div
                                key={club.id}
                                className={`${gradients[index % gradients.length]} tw-shadow-lg tw-rounded-lg tw-p-3 tw-m-3 tw-transition-transform hover:tw-transform hover:tw-scale-105`}
                            >
                                <h2 className="tw-text-lg tw-font-semibold">{club.name}</h2>
                                <p className="tw-text-gray-600">{club.description}</p>
                                <SeverityIndicator value={club.severity} />
                            </div>
                        </BlurFade>
                    ))
                ) : (
                    <p className="tw-text-gray-500 tw-text-center">No clubs found.</p>
                )}
            </div>
        </>
    );
};

export default Browse;