import React, { useState, useEffect, useContext } from 'react';
import BlurFade from "@/components/magicui/blur-fade";
import SeverityIndicator from '@/components/severity';
import Ripple from "../components/magicui/ripple.jsx";
import ShinyButton from "@/components/magicui/shiny-button";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from './userContext.jsx';
// import { response } from 'express';

const gradients = [
    "tw-bg-gradient-to-r tw-from-blue-400 tw-to-blue-600",
    "tw-bg-gradient-to-r tw-from-purple-400 tw-to-purple-600",
    "tw-bg-gradient-to-r tw-from-green-400 tw-to-green-600",
    "tw-bg-gradient-to-r tw-from-yellow-400 tw-to-yellow-600",
    "tw-bg-gradient-to-r tw-from-red-400 tw-to-red-600",
];

export const clubsData = [
    { id: 1, name: "Coding Club", description: "A club for coding enthusiasts who want to learn, share, and collaborate on coding projects. We'll explore various programming languages, frameworks, and technologies, and work on building real-world projects together.", category: "STEM", severity: 3 },
    { id: 2, name: "Art Club", description: "Explore your artistic side and express yourself through various forms of art, including painting, drawing, sculpture, photography, and more. We'll have regular workshops, critiques, and exhibitions to showcase our work.", category: "Humanities", severity: 2 },
    { id: 3, name: "Music Club", description: "For music lovers and musicians who want to share their passion for music. We'll have jam sessions, music theory classes, and performances, and collaborate on music projects and events.", category: "Humanities", severity: 4 },
    { id: 4, name: "Book Club", description: "Read and discuss great books from various genres, including fiction, non-fiction, classics, and contemporary works. We'll have book reviews, author talks, and literary-themed events to foster a love for reading and literature.", category: "Humanities", severity: 1 },
    { id: 5, name: "Sports Club", description: "For sports and fitness enthusiasts who want to stay active and competitive. We'll have regular sports tournaments, fitness classes, and recreational activities, and collaborate on sports-related projects and events.", category: "Athletics", severity: 10 },
    { id: 6, name: "Robotics Club", description: "Design and build robots to solve real-world problems and participate in robotics competitions. We'll learn about robotics engineering, programming, and design, and work on projects that combine technology and creativity.", category: "STEM", severity: 5 },
    { id: 7, name: "Debate Club", description: "Develop your public speaking skills and learn to argue and persuade effectively. We'll have regular debates, mock trials, and speech competitions, and work on topics from politics to social justice.", category: "Humanities", severity: 6 },
    { id: 8, name: "Drama Club", description: "Act, direct, and produce plays to showcase your creativity and talent. We'll have regular rehearsals, performances, and workshops to develop your acting, directing, and production skills.", category: "Humanities", severity: 7 },
    { id: 9, name: "Photography Club", description: "Capture life's moments through photography and learn about the art and technique of photography. We'll have regular photo shoots, workshops, and exhibitions to showcase our work.", category: "Humanities", severity: 8 },
    { id: 10, name: "Gaming Club", description: "Compete and socialize through gaming and learn about the latest gaming trends and technologies. We'll have regular gaming tournaments, LAN parties, and game development workshops.", category: "Athletics", severity: 9 },
    { id: 11, name: "Environmental Club", description: "Promote sustainability and conservation through environmental projects and initiatives. We'll have regular clean-up events, recycling drives, and workshops on sustainable living.", category: "STEM", severity: 11 },
    { id: 12, name: "Language Club", description: "Explore languages and cultures through language exchange, cultural events, and language learning activities. We'll have regular language meetups, cultural festivals, and language-themed events.", category: "Humanities", severity: 12 },
    { id: 13, name: "Business Club", description: "Develop entrepreneurial skills and learn about business management, marketing, and finance. We'll have regular business plan competitions, startup workshops, and networking events.", category: "STEM", severity: 13 },
    { id: 14, name: "Culinary Club", description: "Explore the world of cooking and learn about different cuisines and cooking techniques. We'll have regular cooking classes, food festivals, and culinary-themed events.", category: "Humanities", severity: 14 },
    { id: 15, name: "Fashion Club", description: "Design and create fashion through fashion design, sewing, and styling. We'll have regular fashion shows, workshops, and fashion-themed events.", category: "Humanities", severity: 15 },
    { id: 16, name: "Film Club", description: "Watch and discuss movies from various genres and learn about film production, direction, and criticism. We'll have regular film screenings, director talks, and film-themed events.", category: "Humanities", severity: 16 },
    { id: 17, name: "Theater Club", description: "Act, direct, and produce plays to showcase your creativity and talent. We'll have regular rehearsals, performances, and workshops to develop your acting, directing, and production skills.", category: "Humanities", severity: 17 },
    { id: 18, name: "Volunteer Club", description: "Give back to the community through volunteer work and community service projects. We'll have regular volunteer events, charity drives, and community service initiatives.", category: "Humanities", severity: 18 },
    { id: 19, name: "Outdoor Club", description: "Explore nature and the outdoors through hiking, camping, and outdoor activities. We'll have regular outdoor trips, camping trips, and outdoor-themed events.", category: "Athletics", severity: 19 },
    { id: 20, name: "Wellness Club", description: "Promote physical and mental well-being through fitness classes, yoga, and mindfulness activities. We'll have regular wellness workshops, meditation sessions, and fitness classes.", category: "Athletics", severity: 20 },
  ];

const colorMap = {
    "STEM": "rgb(0, 0, 255)", // blue
    "Humanities": "rgb(128, 0, 128)", // purple
    "Athletics": "rgb(255, 0, 0)" // red
  };

const Browse = () => {
    const {user} = useContext(UserContext);
    const [selectedClub, setSelectedClub] = useState(null);  // State to track selected club
    const [showModal, setShowModal] = useState(false);       // Modal stat
    const [searchTerm, setSearchTerm] = useState('');
    const [clubDatabase, setClubs] = useState([]);
    const [filteredClubs, setFilteredClubs] = useState([]);
    const [selectedClub, setSelectedClub] = useState(null);  // State to track selected club

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
    
    const handleJoin = (e) => {
        try
        {
            const result = fetch('/api/userToClub', {
                method: "POST",
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({_id: user.id, club: e})
            });
            
            const result2 = fetch('/api/clubToUser', {
                method: "POST",
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({_id: user.id, club: e})
            });
        } catch (error) {
            console.log("Database failure: " + error);
        }
    }

// const Browse = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filteredClubs, setFilteredClubs] = useState(clubsData);
//     const [showModal, setShowModal] = useState(false);       // Modal state

//     useEffect(() => {
//         // Disable horizontal scrolling
//         document.body.style.overflowX = 'hidden';
//         document.body.style.overflowY = 'auto'; // Allow vertical scrolling

//         return () => {
//             document.body.style.overflowX = 'auto';
//             document.body.style.overflowY = 'auto';
//         };
//     }, []);

//     const handleSearch = (e) => {
//         const term = e.target.value;
//         setSearchTerm(term);
//         setFilteredClubs(
//             clubsData.filter(club =>
//                 club.name.toLowerCase().includes(term.toLowerCase())
//             )
//         );
//     };

    const handleClubClick = (club) => {
        setSelectedClub(club);  // Set the clicked club
        setShowModal(true);     // Show the modal
    };

    const handleClose = () => setShowModal(false);  // Close the modal

    return (
        <>
            <Ripple />
            <BlurFade delay={0.25 * 0.05} inView>
                <h1 className="tw-text-4xl tw-font-bold tw-text-center tw-text-zinc-300 tw-my-8">
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

            {/* Clubs Grid */}
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4" style={{ padding: '3% 10%' }}>
                {filteredClubs.length > 0 ? (
                    filteredClubs.map((club, index) => (
                        <BlurFade key={club.id} delay={0.1 + index * 0.05} inView>
                            {/* Make the entire card clickable */}
                            <div
                                onClick={() => handleClubClick(club)}  // Pass the club to the handler
                                className={`tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-6 tw-m-4 tw-transition-transform tw-duration-300 hover:tw-transform hover:tw-scale-105`}
                                style={{ cursor: 'pointer' }}  // Add cursor pointer to indicate clickability
                            >
                                <h2 className="tw-text-3xl tw-font-semibold tw-m-2">{club.name}</h2>
                                <p className="tw-text-gray-600 tw-mb-4 tw-m-2">{club.description}</p>
                                <ShinyButton
                                    type="button"
                                    className="tw-w-1/2 tw-rounded-lg tw-bg-white tw-border-4"
                                    style={{
                                        borderRadius: '40px',
                                        borderColor: `${colorMap[club.category]}`
                                    }}
                                >
                                    {`${club.category}`}
                                </ShinyButton>
                            </div>
                        </BlurFade>
                    ))
                ) : (
                    <p className="tw-text-gray-500 tw-text-center">No clubs found. Womp Womp</p>
                )}
            </div>
{/* Modal using React-Bootstrap */}
            {selectedClub ? (
                <Modal show={showModal} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedClub.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Category:</strong> {selectedClub.category}</p>
                        <p><strong>Description:</strong> {selectedClub.description}</p>
                        {/* Display the severity rating (authenticity) only in the modal */}
                        <p><strong>Authenticity:</strong> {selectedClub.authenticity}</p>
                    </Modal.Body>
                    <Modal.Footer className="tw-flex tw-justify-between">
                        <ShinyButton
                            type="button"
                            onClick={() => handleJoin(selectedClub._id)}  // Example action for the button
                        >
                            Join
                        </ShinyButton>
                        <button
                            onClick={handleClose}
                            className="tw-bg-gray-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-md hover:tw-bg-gray-700"
                        >
                            Close
                        </button>
                        {/* Shiny Join Button */}
                    </Modal.Footer>
                </Modal>
            ) : <div></div>} 
        </>
    );
};

export default Browse;