import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Use Link from react-router-dom for navigation
import 'bootstrap/dist/css/bootstrap.css';

function NavbarComponent() {
    return (
        <Navbar expand="lg" className="tw-bg-gradient-to-r tw-from-blue-800 tw-to-blue-950 tw-shadow-lg" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">Club Club</Navbar.Brand> {/* Use Link for routing */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/browse">Browse</Nav.Link> {/* Use Link for routing */}
                        <Nav.Link as={Link} to="/join">Join</Nav.Link> {/* Use Link for routing */}
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/login">Login</Nav.Link> {/* Use Link for routing */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;