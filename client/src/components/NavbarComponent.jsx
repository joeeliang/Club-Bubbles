import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function NavbarComponent() {
    const [loggedInUser, setLoggedInUser] = useState(null);

    // Check localStorage for the logged-in user
    useEffect(() => {
        const user = localStorage.getItem('loggedInUser'); // Assuming you store the username or ID after login
        if (user) {
            setLoggedInUser(user);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser'); // Clear the login data on logout
        setLoggedInUser(null);
    };

    return (
        <Navbar expand="lg" className="tw-bg-transparent tw-shadow-2xl tw-z-20 tw-border-b-accent tw-border-b-2 tw-border-zinc-400" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">Club Bubbles</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/browse">Browse</Nav.Link>
                        <Nav.Link as={Link} to="/proposal">Proposal</Nav.Link>
                        <Nav.Link as={Link} to="/myclubs">My Clubs</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {loggedInUser ? (
                            <>
                                <Nav.Link disabled>Logged in as {loggedInUser}</Nav.Link>
                                <Nav.Link as={Link} to="/login" onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;