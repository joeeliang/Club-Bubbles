import React, { useEffect, useState } from 'react';

export function Home() {
    const [club, setClub] = useState(null);
    const [connected, setConnection] = useState(null);
    
    useEffect(() => {
        fetch('/api/club')
        .then((response) => response.json())
        .then((data) => setClub(data))
        .catch((error) => console.error('Error fetching club:', error));
    }, [])
    return (
        <>
            <h1>DEAL WITH IT</h1>
            {club ? (
                <div>
                    <p>
                        Name: {club.name}
                    </p>
                    <p>Description: {club._id}</p>
                </div>
            ) : (
                <p>Loading club info...</p>
            )
                
            }
            <a href="/#page2">GOTONEXTPAGE</a>
        </>
    )
}

export default Home;