import { cn } from "@/lib/utils";
import SparklesText from "@/components/magicui/sparkles-text";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";import { useState, useEffect, useContext } from 'react';
import BlurFade from "@/components/magicui/blur-fade";
import SeverityIndicator from '@/components/severity';
import { UserContext } from './userContext'; // Correct import
import { data } from 'autoprefixer';
// import { response } from 'express';

// const clubsData = [
//     { id: 1, name: "Coding Club", description: "A club for coding enthusiasts.", category: "STEM", severity: 3 },
//     { id: 2, name: "Art Club", description: "Explore your artistic side.", category: "Humanities", severity: 2 },
//     { id: 3, name: "Music Club", description: "For music lovers and musicians.", category: "Humanities", severity: 4 },
//     { id: 4, name: "Book Club", description: "Read and discuss great books.", category: "Humanities", severity: 1 },
//     { id: 5, name: "Sports Club", description: "For sports and fitness activities.", category: "Athletics", severity: 10 },
//     { id: 6, name: "Robotics Club", description: "Design and build robots.", category: "Stem", severity: 5 },
//     { id: 7, name: "Debate Club", description: "Develop your public speaking skills.", category: "Humanities", severity: 6 },
//     { id: 8, name: "Drama Club", description: "Act, direct, and produce plays.", category: "Humanities", severity: 7 },
//     { id: 9, name: "Photography Club", description: "Capture life's moments through photography.", category: "Humanities", severity: 8 },
//     { id: 10, name: "Gaming Club", description: "Compete and socialize through gaming.", category: "Athletics", severity: 9 },
//     { id: 11, name: "Environmental Club", description: "Promote sustainability and conservation.", category: "Stem", severity: 11 },
//     { id: 12, name: "Language Club", description: "Explore languages and cultures.", category: "Humanities", severity: 12 },
//     { id: 13, name: "Business Club", description: "Develop entrepreneurial skills.", category: "Stem", severity: 13 },
//     { id: 14, name: "Culinary Club", description: "Explore the world of cooking.", category: "Humanities", severity: 14 },
//     { id: 15, name: "Fashion Club", description: "Design and create fashion.", category: "Humanities", severity: 15 },
//     { id: 16, name: "Film Club", description: "Watch and discuss movies.", category: "Humanities", severity: 16 },
//     { id: 17, name: "Theater Club", description: "Act, direct, and produce plays.", category: "Humanities", severity: 17 },
//     { id: 18, name: "Volunteer Club", description: "Give back to the community.", category: "Humanities", severity: 18 },
//     { id: 19, name: "Outdoor Club", description: "Explore nature and the outdoors.", category: "Athletics", severity: 19 },
//     { id: 20, name: "Wellness Club", description: "Promote physical and mental well-being.", category: "Athletics", severity: 20 },
//   ];

// const gradients = [
//     "tw-bg-gradient-to-r tw-from-blue-400 tw-to-blue-600",
//     "tw-bg-gradient-to-r tw-from-purple-400 tw-to-purple-600",
//     "tw-bg-gradient-to-r tw-from-green-400 tw-to-green-600",
//     "tw-bg-gradient-to-r tw-from-yellow-400 tw-to-yellow-600",
//     "tw-bg-gradient-to-r tw-from-red-400 tw-to-red-600",
// ];

const colorMap = {
    "STEM": "tw-bg-gradient-to-r tw-from-blue-400 tw-to-blue-600",
    "Humanities": "tw-bg-gradient-to-r tw-from-purple-400 tw-to-purple-600",
    "Athletics": "tw-bg-gradient-to-r tw-from-red-400 tw-to-red-600",
  };

const BrowseMy = () => {
    const { user } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [clubDatabase, setClubs] = useState([]);

    useEffect(() => {
         // Disable horizontal scrolling
         document.body.style.overflowX = 'hidden';
         document.body.style.overflowY = 'auto'; // Allow vertical scrolling

         return () => {
             document.body.style.overflowX = 'auto';
             document.body.style.overflowY = 'auto';
         };
     }, []);

    const [filteredClubs, setFilteredClubs] = useState([]);

    useEffect(() => {
        fetch('/api/myclubs', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({_id: user.id})
        })
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
        <div className="tw-relative tw-w-full tw-h-screen tw-flex tw-flex-col tw-items-center tw-justify-start tw-overflow-hidden">
            {/* Animated Grid Pattern as Background */}
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                repeatDelay={1}
                className={cn(
                    "tw-fixed tw-inset-0 tw-h-full tw-w-full tw-skew-y-12", // tw-fixed ensures it covers the entire screen behind the navbar
                    "[tw-mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
                )}
            />
            <div className="tw-relative tw-z-10 tw-w-full tw-pt-10"> {/* Added padding to push content slightly down */}
                <BlurFade delay={0.25 * 0.05} inView>
                    <div className="tw-text-4xl tw-font-bold tw-text-center tw-text-zinc-300 tw-mt-2"> {/* Reduced margin to bring text higher */}
                        <SparklesText text="My Clubs" />
                    </div>
                </BlurFade>
                <BlurFade delay={0.15} inView>
                    <div className="tw-flex tw-justify-center tw-mt-2 tw-mb-4 tw-text-white"> {/* Reduced margin-top and margin-bottom */}
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="tw-p-3 tw-w-1/2 tw-border-b tw-border-gray-300 tw-bg-transparent focus:tw-outline-none focus:tw-ring-0"
                            placeholder="Search for clubs..."
                        />
                    </div>
                </BlurFade>
                <div className="tw-mb-4"></div>
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4 tw-z-10">
                    {filteredClubs.length > 0 ? (
                        filteredClubs.map((club) => (
                            <BlurFade key={club._id} delay={0.25 + club._id * 0.05} inView>
                                <div
                                    key={club.id}
                                    className={`${colorMap[club.category]} tw-shadow-lg tw-rounded-lg tw-p-3 tw-m-3 tw-transition-transform hover:tw-transform hover:tw-scale-105`}
                                >
                                    <h2 className="tw-text-lg tw-font-semibold">{club.name}</h2>
                                    <p className="tw-text-gray-600">{club.description}</p>
                                    <SeverityIndicator value={club.authenticity}/>
                                </div>
                            </BlurFade>
                        ))
                    ) : (
                        <p className="tw-text-gray-500 tw-text-center">No clubs found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BrowseMy;