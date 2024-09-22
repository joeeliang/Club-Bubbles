import Marquee from "@/components/magicui/marquee";
import BlurFade from "@/components/magicui/blur-fade";
import { useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types';

const clubsData = [
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
  
  export function MarqueeEffect() {
    // Using clubsData directly
    const firstRow = clubsData.slice(0, clubsData.length / 2);
    const secondRow = clubsData.slice(clubsData.length / 2);

    const [visibleCards, setVisibleCards] = useState(Array(clubsData.length).fill(false));
    const [activeCard, setActiveCard] = useState(null);
    const refs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const index = Number(entry.target.dataset.index);
                if (entry.isIntersecting) {
                    setVisibleCards(prev => {
                        const newVisibleCards = [...prev];
                        newVisibleCards[index] = true;
                        return newVisibleCards;
                    });
                }
            });
        });

        const currentRefs = refs.current;
        currentRefs.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => {
            currentRefs.forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    const handleCardClick = (club) => {
        setActiveCard(club);
    };

    const handleCloseModal = () => {
        setActiveCard(null);
    };

    return (
        <div className="tw-relative tw-flex tw-h-[500px] tw-w-full tw-flex-col tw-items-center tw-justify-center tw-overflow-hidden tw-rounded-lg tw-border-transparent tw-bg-transparent tw-md:shadow-xl">
            {/* First Marquee Row */}
            <Marquee pauseOnHover className="[--duration:20s] tw-mb-4">
                {firstRow.map((club, index) => (
                    <div ref={el => refs.current[index] = el} data-index={index} key={club.id}>
                        <BlurFade inView={visibleCards[index]} delay={0.1 + club.id * 0.05}>
                            <ReviewCard
                                name={club.name}
                                body={club.description}
                                username={club.category}  // Using category in place of username
                                img={`https://avatar.vercel.sh/${club.id}`}  // Placeholder avatar
                                onClick={() => handleCardClick(club)}
                            />
                        </BlurFade>
                    </div>
                ))}
            </Marquee>

            {/* Second Marquee Row */}
            <Marquee reverse pauseOnHover className="[--duration:20s] tw-mt-4">
                {secondRow.map((club, index) => (
                    <div ref={el => refs.current[index + firstRow.length] = el} data-index={index + firstRow.length} key={club.id}>
                        <BlurFade inView={visibleCards[index + firstRow.length]} delay={0.1 + club.id * 0.05}>
                            <ReviewCard
                                name={club.name}
                                body={club.description}
                                username={club.category}
                                img={`https://avatar.vercel.sh/${club.id}`}  // Placeholder avatar
                                onClick={() => handleCardClick(club)}
                            />
                        </BlurFade>
                    </div>
                ))}
            </Marquee>

            {/* Modal for zoomed-in card */}
            {activeCard && (
                <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-black tw-bg-opacity-70">
                    <div className="tw-relative tw-w-full tw-max-w-lg tw-bg-white tw-rounded-lg tw-p-10 tw-shadow-lg">
                        <button
                            className="tw-absolute tw-top-2 tw-right-2 tw-bg-transparent tw-border-none tw-text-black tw-text-2xl"
                            onClick={handleCloseModal}
                        >
                            &times;
                        </button>
                        <img className="tw-rounded-full tw-mb-4" width="128" height="128" alt="" src={`https://avatar.vercel.sh/${activeCard.id}`} />
                        <h2 className="tw-text-xl tw-font-bold">{activeCard.name}</h2>
                        <p className="tw-text-sm tw-font-medium">{activeCard.category}</p>
                        <blockquote className="tw-mt-2 tw-text-md">{activeCard.description}</blockquote>
                    </div>
                </div>
            )}

            {/* Gradient Background */}
            <div className="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-left-0 tw-w-1/3 tw-bg-gradient-to-r tw-from-transparent tw-dark:from-background"></div>
            <div className="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-w-1/3 tw-bg-gradient-to-l tw-from-transparent tw-dark:from-background"></div>
        </div>
    );
}
ReviewCard.propTypes = {
    img: PropTypes.string,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

const ReviewCard = ({ img = "", name = "", username = "", body = "", onClick }) => {
    return (
        <figure onClick={onClick} className="tw-relative tw-w-64 tw-cursor-pointer tw-overflow-hidden tw-rounded-xl tw-border tw-p-4 tw-border-gray-950/[.1] 
            tw-bg-gray-950/[.01] tw-hover:bg-gray-950/[.05] 
            tw-dark:border-gray-50/[.1] tw-dark:bg-gray-50/[.10] tw-dark:hover:bg-gray-50/[.15] tw-mr-4 tw-bg-zinc-300
            tw-bg-opacity-95">
            <div className="tw-flex tw-flex-row tw-items-center tw-gap-2 tw-shadow-2xl">
                <img className="tw-rounded-full" width="32" height="32" alt="" src={img} />
                <div className="tw-flex tw-flex-col">
                    <figcaption className="tw-text-sm tw-font-medium tw-dark:text-white">
                        {name}
                    </figcaption>
                    <p className="tw-text-xs tw-font-medium tw-dark:text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="tw-mt-2 tw-text-sm">{body}</blockquote>
        </figure>
    );
}
