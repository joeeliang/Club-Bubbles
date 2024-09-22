import { useState, useEffect, useContext } from 'react';
import BlurFade from "@/components/magicui/blur-fade";
import Ripple from "../components/magicui/ripple.jsx";
import ShinyButton from "@/components/magicui/shiny-button";
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from './userContext.jsx';



const colorMap = {
    "STEM": "rgb(52, 235, 219)", // Cyan
    "Humanities": "rgb(52, 235, 122)", // Lime
    "Athletics": "rgb(235, 70, 52)" // red
  };

const Browse = () => {
    const {user} = useContext(UserContext);
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
                    body: JSON.stringify({user: user.id, club: e})
                });
                
                fetch('/api/clubToUser', {
                    method: "POST",
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({user: user.id, club: e})
                });
                console.log()
            } catch (error) {
                console.log("Database failure: " + error);
            }
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
                        <p><strong>Authenticity:</strong> {selectedClub.authenticityScore}</p>
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