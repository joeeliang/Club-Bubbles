import React, { useState, useEffect } from 'react';
import BlurFade from "@/components/magicui/blur-fade";
import SeverityIndicator from '@/components/severity';
import Ripple from "../components/magicui/ripple.jsx";
// import { response } from 'express';

const clubsData = [
    { id: 1, name: "Coding Club", description: "A club for coding enthusiasts.", category: "STEM", severity: 3 },
    { id: 2, name: "Art Club", description: "Explore your artistic side.", category: "Humanities", severity: 2 },
    { id: 3, name: "Music Club", description: "For music lovers and musicians.", category: "Humanities", severity: 4 },
    { id: 4, name: "Book Club", description: "Read and discuss great books.", category: "Humanities", severity: 1 },
    { id: 5, name: "Sports Club", description: "For sports and fitness activities.", category: "Athletics", severity: 10 },
    { id: 6, name: "Robotics Club", description: "Design and build robots.", category: "Stem", severity: 5 },
    { id: 7, name: "Debate Club", description: "Develop your public speaking skills.", category: "Humanities", severity: 6 },
    { id: 8, name: "Drama Club", description: "Act, direct, and produce plays.", category: "Humanities", severity: 7 },
    { id: 9, name: "Photography Club", description: "Capture life's moments through photography.", category: "Humanities", severity: 8 },
    { id: 10, name: "Gaming Club", description: "Compete and socialize through gaming.", category: "Athletics", severity: 9 },
    { id: 11, name: "Environmental Club", description: "Promote sustainability and conservation.", category: "Stem", severity: 11 },
    { id: 12, name: "Language Club", description: "Explore languages and cultures.", category: "Humanities", severity: 12 },
    { id: 13, name: "Business Club", description: "Develop entrepreneurial skills.", category: "Stem", severity: 13 },
    { id: 14, name: "Culinary Club", description: "Explore the world of cooking.", category: "Humanities", severity: 14 },
    { id: 15, name: "Fashion Club", description: "Design and create fashion.", category: "Humanities", severity: 15 },
    { id: 16, name: "Film Club", description: "Watch and discuss movies.", category: "Humanities", severity: 16 },
    { id: 17, name: "Theater Club", description: "Act, direct, and produce plays.", category: "Humanities", severity: 17 },
    { id: 18, name: "Volunteer Club", description: "Give back to the community.", category: "Humanities", severity: 18 },
    { id: 19, name: "Outdoor Club", description: "Explore nature and the outdoors.", category: "Athletics", severity: 19 },
    { id: 20, name: "Wellness Club", description: "Promote physical and mental well-being.", category: "Athletics", severity: 20 },
  ];

const gradients = [
    "tw-bg-gradient-to-r tw-from-blue-400 tw-to-blue-600",
    "tw-bg-gradient-to-r tw-from-purple-400 tw-to-purple-600",
    "tw-bg-gradient-to-r tw-from-green-400 tw-to-green-600",
    "tw-bg-gradient-to-r tw-from-yellow-400 tw-to-yellow-600",
    "tw-bg-gradient-to-r tw-from-red-400 tw-to-red-600",
];

const colorMap = {
    "STEM": "tw-bg-gradient-to-r tw-from-blue-400 tw-to-blue-600",
    "Humanities": "tw-bg-gradient-to-r tw-from-purple-400 tw-to-purple-600",
    "Athletics": "tw-bg-gradient-to-r tw-from-red-400 tw-to-red-600",
  };

const Browse = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [clubDatabase, setClubs] = useState([]);
    const [filteredClubs, setFilteredClubs] = useState([]);

    useEffect(() => {
        fetch('/api/clubs')
           .then((response) => response.json())
           .then((data) => {
                setClubs(data);
                setFilteredClubs(data);
            })
           .catch((error) => console.error('error fetching: ', error ));
        console.log("WE ARE DOING SOMETHING");
    }, [])

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        setFilteredClubs(
            clubDatabase.filter(club =>
                club.name.toLowerCase().includes(term.toLowerCase())
            )
        );
    };

    return (
        <>
            <Ripple/>
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
                {filteredClubs.length > 0 ? (
                    filteredClubs.map((club, index) => (
                        <BlurFade key={club._id} delay={0.25 + club._id * 0.05} inView>
                            <div
                                key={club.id}
                                className={`${colorMap[club.category]} tw-shadow-lg tw-rounded-lg tw-p-3 tw-m-3 tw-transition-transform hover:tw-transform hover:tw-scale-105`}
                            >
                                <h2 className="tw-text-lg tw-font-semibold">{club.name}</h2>
                                <p className="tw-text-gray-600">{club.description}</p>
                                <SeverityIndicator value={club.authenticity} />
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