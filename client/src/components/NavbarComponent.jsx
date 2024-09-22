import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function NavbarComponent() {
    return (
        <Navbar expand="lg" className="tw-bg-transparent tw-shadow-2xl tw-z-20 tw-border-b-accent tw-border-b-2 tw-border-zinc-400" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">Club Club</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/browse">Browse</Nav.Link>
                        <Nav.Link as={Link} to="/proposal">Proposal</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
