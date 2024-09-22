import Marquee from "@/components/magicui/marquee";
import BlurFade from "@/components/magicui/blur-fade";
import { useEffect, useState, useRef } from "react";

const ReviewCard = ({ img, name, username, body, onClick }) => {
    return (
        <figure
            onClick={onClick}
            className="tw-relative tw-w-64 tw-cursor-pointer tw-overflow-hidden tw-rounded-xl tw-border tw-p-4 tw-border-gray-950/[.1] 
                tw-bg-gray-950/[.01] tw-hover:bg-gray-950/[.05] 
                tw-dark:border-gray-50/[.1] tw-dark:bg-gray-50/[.10] tw-dark:hover:bg-gray-50/[.15] tw-mr-4 tw-bg-zinc-300
                tw-bg-opacity-35">
            <div className="tw-flex tw-flex-row tw-items-center tw-gap-2">
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
};

export function MarqueeDemo() {
    const reviews = [
        { id: 1, name: "Jack", username: "@jack", body: "I've never seen anything like this before. It's amazing. I love it.", img: "https://avatar.vercel.sh/jack" },
        { id: 2, name: "Jill", username: "@jill", body: "I don't know what to say. I'm speechless. This is amazing.", img: "https://avatar.vercel.sh/jill" },
        { id: 3, name: "John", username: "@john", body: "I'm at a loss for words. This is amazing. I love it.", img: "https://avatar.vercel.sh/john" },
        { id: 4, name: "Jane", username: "@jane", body: "I'm at a loss for words. This is amazing.", img: "https://avatar.vercel.sh/jane" },
        { id: 5, name: "Jenny", username: "@jenny", body: "I'm at a loss for words. This is amazing.", img: "https://avatar.vercel.sh/jenny" },
        { id: 6, name: "James", username: "@james", body: "I'm at a loss for words. This is amazing.", img: "https://avatar.vercel.sh/james" },
    ];

    const firstRow = reviews.slice(0, reviews.length / 2);
    const secondRow = reviews.slice(reviews.length / 2);

    const [visibleCards, setVisibleCards] = useState(Array(reviews.length).fill(false));
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

        refs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => {
            refs.current.forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    const handleCardClick = (review) => {
        setActiveCard(review);
    };

    const handleCloseModal = () => {
        setActiveCard(null);
    };

    return (
        <div className="tw-relative tw-flex tw-h-[500px] tw-w-full tw-flex-col tw-items-center tw-justify-center tw-overflow-hidden tw-rounded-lg tw-border-transparent tw-bg-transparent tw-md:shadow-xl">
            {/* First Marquee Row */}
            <Marquee pauseOnHover className="[--duration:20s] tw-mb-4">
                {firstRow.map((review, index) => (
                    <div ref={el => refs.current[index] = el} data-index={index} key={review.id}>
                        <BlurFade inView={visibleCards[index]} delay={0.1 + review.id * 0.05}>
                            <ReviewCard {...review} onClick={() => handleCardClick(review)} />
                        </BlurFade>
                    </div>
                ))}
            </Marquee>

            {/* Second Marquee Row */}
            <Marquee reverse pauseOnHover className="[--duration:20s] tw-mt-4">
                {secondRow.map((review, index) => (
                    <div ref={el => refs.current[index + firstRow.length] = el} data-index={index + firstRow.length} key={review.id}>
                        <BlurFade inView={visibleCards[index]} delay={0.1 + review.id * 0.05}>
                            <ReviewCard {...review} onClick={() => handleCardClick(review)} />
                        </BlurFade>
                    </div>
                ))}
            </Marquee>

            {/* Gradient Background */}
            <div className="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-left-0 tw-w-1/3 tw-bg-gradient-to-r tw-from-transparent tw-dark:from-background"></div>
            <div className="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-w-1/3 tw-bg-gradient-to-l tw-from-transparent tw-dark:from-background"></div>

            {/* Modal for zoomed-in card */}
            {activeCard && (
                <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-black tw-bg-opacity-70">
                    <div className="tw-relative tw-w-full tw-max-w-lg tw-bg-white tw-rounded-lg tw-p-4 tw-shadow-lg">
                        <button
                            className="tw-absolute tw-top-2 tw-right-2 tw-bg-transparent tw-border-none tw-text-black tw-text-2xl"
                            onClick={handleCloseModal}
                        >
                            &times;
                        </button>
                        <img className="tw-rounded-full tw-mb-4" width="128" height="128" alt="" src={activeCard.img} />
                        <h2 className="tw-text-xl tw-font-bold">{activeCard.name}</h2>
                        <p className="tw-text-sm tw-font-medium">{activeCard.username}</p>
                        <blockquote className="tw-mt-2 tw-text-md">{activeCard.body}</blockquote>
                    </div>
                </div>
            )}
        </div>
    );
}
