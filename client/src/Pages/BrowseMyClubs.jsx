import { cn } from "@/lib/utils";
import SparklesText from "@/components/magicui/sparkles-text";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";import { useState, useEffect, useContext } from 'react';
import BlurFade from "@/components/magicui/blur-fade";
import ShinyButton from "@/components/magicui/shiny-button";
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from './userContext'; // Correct import
// import { response } from 'express';



// const gradients = [
//     "tw-bg-gradient-to-r tw-from-blue-400 tw-to-blue-600",
//     "tw-bg-gradient-to-r tw-from-purple-400 tw-to-purple-600",
//     "tw-bg-gradient-to-r tw-from-green-400 tw-to-green-600",
//     "tw-bg-gradient-to-r tw-from-yellow-400 tw-to-yellow-600",
//     "tw-bg-gradient-to-r tw-from-red-400 tw-to-red-600",
// ];


const colorMap = {
    "STEM": "rgb(52, 235, 219)", // Cyan
    "Humanities": "rgb(52, 235, 122)", // Lime
    "Athletics": "rgb(235, 70, 52)" // red
};


const BrowseMy = () => {
    const { user } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);       // Modal stat
    const [clubDatabase, setClubs] = useState([]);
    const [selectedClub, setSelectedClub] = useState(null); 

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
        if (user) {
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
        }
    })

    const handleUnJoin = (clubID) => {
        if (user)
        {
            try
            {
                fetch('/api/userToClub', {
                    method: "POST",
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({user: user.id, club: clubID})
                });
                
                fetch('/api/clubToUser', {
                    method: "POST",
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({user: user.id, club: clubID})
                });
            } catch (error) {
                console.log("Database failure: " + error);
            }
        }
    }

    const handleClubClick = (club) => {
        setSelectedClub(club);  // Set the clicked club
        setShowModal(true);     // Show the modal
    };

    const handleClose = () => setShowModal(false);  // Close the modal

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
                        <p><strong>Authenticity:</strong> {selectedClub.authenticityScore}</p>
                    </Modal.Body>
                    <Modal.Footer className="tw-flex tw-justify-between">
                        <ShinyButton
                            type="button"
                            onClick={() => handleUnJoin(selectedClub._id)}  // Example action for the button
                        >
                            Unjoin
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
        </div>
        </div>
    );
};

export default BrowseMy;